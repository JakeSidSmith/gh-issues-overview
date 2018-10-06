import {
  composeComquestReducers,
  ComquestRequestData,
  ComquestSuccessAction,
  createComquestRequestErrorReducer,
  createComquestRequestStateReducer,
} from 'comquest';
import { AnyAction } from 'redux';

import { GET_ISSUES, GET_REPOS, TOGGLE_REPO_COLLAPSE } from '^/client/action-types';
import { Issue, Issues, Repos } from '^/client/types';

export const repos = composeComquestReducers(
  (state: ComquestRequestData<Repos> = {}, action: AnyAction) => {
    switch (action.type) {
      case GET_REPOS.SUCCESS:
        return {
          data: (state.data || []).concat(action.payload),
        };
      default:
        return state;
    }
  },
  createComquestRequestErrorReducer(GET_REPOS),
  createComquestRequestStateReducer(GET_REPOS)
);

export interface IssuesRequestState {
  loadingUrls?: ReadonlyArray<string>;
}

export const issues = composeComquestReducers(
  (state: ComquestRequestData<Issues> = {}, action: AnyAction): ComquestRequestData<Issues> => {
    switch (action.type) {
      case GET_ISSUES.SUCCESS:
        const comquestAction = action as ComquestSuccessAction<ReadonlyArray<Issue>>;
        const key = comquestAction.meta.url as string;

        return {
          data: {
            ...(state.data || {}),
            [key]: ((state.data || {})[key] || []).concat(action.payload),
          },
        };
      default:
        return state;
    }
  },
  createComquestRequestErrorReducer(GET_ISSUES),
  (state: IssuesRequestState = {}, action: AnyAction): IssuesRequestState => {
    switch (action.type) {
      case GET_ISSUES.REQUEST:
        return {
          loadingUrls: (state.loadingUrls || []).concat(action.meta.url as string),
        };
      case GET_ISSUES.SUCCESS:
      case GET_ISSUES.FAILURE:
        const urlIndex = state.loadingUrls ? state.loadingUrls.indexOf(action.meta.url) : -1;

        if (urlIndex >= 0) {
          return {
            loadingUrls: state.loadingUrls!.filter((_value, index) => index !== urlIndex),
          };
        }

        return state;
      default:
        return state;
    }
  }
);

export type CollapsedRepos = Set<number>;

export const collapsedRepos = (state: CollapsedRepos = new Set(), action: AnyAction): CollapsedRepos => {
  switch (action.type) {
    case GET_REPOS.SUCCESS:
      (action as ComquestSuccessAction<Repos>).payload.forEach((repo) => {
        state.add(repo.id);
      });

      return new Set(state.values());
    case TOGGLE_REPO_COLLAPSE:
      if (state.has(action.payload)) {
        state.delete(action.payload);
      } else {
        state.add(action.payload);
      }

      return new Set(state.values());
    default:
      return state;
  }
};
