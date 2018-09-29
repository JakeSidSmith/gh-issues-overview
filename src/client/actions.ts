import { createComquestRequestAction } from 'comquest';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { GET_REPOS } from '^/client/action-types';
import { StoreState } from '^/client/store';

export const getRepos = createComquestRequestAction(GET_REPOS, {
  method: 'GET',
  url: '/api/user/repos',
});

type DispatchComquestAction = ThunkDispatch<StoreState, undefined, AnyAction>;

export const getAllRepos = () => (dispatch: DispatchComquestAction) => {
  dispatch(getRepos({params: {per_page: 100}}, {throwErrors: true}))
    .then((response) => {
      console.log(response);
    })
    .catch(() => null);
};
