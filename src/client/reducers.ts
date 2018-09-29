import {
  composeComquestReducers,
  ComquestRequestData,
  createComquestRequestErrorReducer,
  createComquestRequestStateReducer,
} from 'comquest';

import { GET_REPOS } from '^/client/action-types';
import { Repos } from '^/client/types';
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
