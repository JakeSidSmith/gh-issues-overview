import {
  composeComquestReducers,
  createComquestRequestDataReducer,
  createComquestRequestErrorReducer,
  createComquestRequestStateReducer,
} from 'comquest';

import { GET_REPOS } from '^/client/action-types';
import { Repos } from '^/client/types';

export const repos = composeComquestReducers(
  createComquestRequestDataReducer<Repos>(GET_REPOS),
  createComquestRequestErrorReducer(GET_REPOS),
  createComquestRequestStateReducer(GET_REPOS)
);
