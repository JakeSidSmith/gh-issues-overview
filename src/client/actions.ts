import { AxiosError, AxiosResponse } from 'axios';
import { createComquestRequestAction } from 'comquest';
import parseLinkHeader from 'parse-link-header';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { GET_ISSUES, GET_REPOS, TOGGLE_REPO_COLLAPSE } from '^/client/action-types';
import { StoreState } from '^/client/store';
import { getProxyUrl } from '^/client/utils';

export const toggleRepoCollapse = (id: number) => ({
  type: TOGGLE_REPO_COLLAPSE,
  payload: id,
});

export const getRepos = createComquestRequestAction(GET_REPOS, {
  method: 'GET',
  url: '/api/user/repos',
});

export const getIssues = createComquestRequestAction(GET_ISSUES, {
  method: 'GET',
  params: {
    per_page: 100,
  },
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
    return dispatch(getRepos(typeof url === 'string' ? {url: getProxyUrl(url), params} : {params}))
      .then(handleResponse);
  };

  createRepoRequest();
};
