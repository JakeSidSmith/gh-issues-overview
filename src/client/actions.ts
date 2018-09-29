import { AxiosError, AxiosPromise, AxiosResponse } from 'axios';
import { createComquestRequestAction } from 'comquest';
import parseLinkHeader from 'parse-link-header';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { GET_REPOS } from '^/client/action-types';
import { StoreState } from '^/client/store';

export const getRepos = createComquestRequestAction(GET_REPOS, {
  method: 'GET',
  url: '/api/user/repos',
});

type DispatchComquestAction = ThunkDispatch<StoreState, undefined, AnyAction>;

export const getAllRepos = () => (dispatch: DispatchComquestAction) => {
  let createRepoRequest: (url?: string) => Promise<AxiosResponse | AxiosError | undefined>;

  const handleResponse = (response: AxiosResponse | AxiosError) => {
    if (response instanceof Error) {
      // Ignore errors
      return undefined;
    }

    if (typeof response.headers.link === 'string') {
      const links = parseLinkHeader(response.headers.link);

      if (links && links.next) {
        createRepoRequest(links.next.url);
      }
    }
  };

  createRepoRequest = (url?: string) => {
    const params = {per_page: 10};
    return dispatch(getRepos(typeof url === 'string' ? {url, params} : {params}))
      .then(handleResponse);
  };

  createRepoRequest();
};
