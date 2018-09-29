import {
  composeComquestReducers,
  createComquestRequestDataReducer,
  createComquestRequestErrorReducer,
  createComquestRequestStateReducer,
} from 'comquest';

import { GET_REPOS } from '^/client/action-types';

export const repos = composeComquestReducers(
  createComquestRequestDataReducer(GET_REPOS),
  createComquestRequestErrorReducer(GET_REPOS),
  createComquestRequestStateReducer(GET_REPOS)
);
