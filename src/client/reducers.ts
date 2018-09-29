import {
  composeComquestReducers,
  ComquestAction,
  ComquestRequestData,
  ComquestSuccessAction,
  createComquestRequestErrorReducer,
  createComquestRequestStateReducer,
} from 'comquest';

import { GET_ISSUES, GET_REPOS } from '^/client/action-types';
import { Issue, Issues, Repos } from '^/client/types';
import { AnyAction } from '../../node_modules/redux';

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

export const issues = composeComquestReducers(
  (state: ComquestRequestData<Issues> = {}, action: AnyAction) => {
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
  createComquestRequestStateReducer(GET_ISSUES)
);
