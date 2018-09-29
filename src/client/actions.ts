import { createComquestRequestAction } from 'comquest';

import { GET_REPOS } from '^/client/action-types';

export const getRepos = createComquestRequestAction(GET_REPOS, {
  method: 'GET',
  url: '/api/user/repos',
});
