import {
  ComquestRequestData,
  ComquestRequestError,
  ComquestRequestState,
  createComquestMiddleware,
} from 'comquest';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import * as reducers from '^/client/reducers';
import { Issues, Repos } from '^/client/types';

export interface StoreState {
  repos: ComquestRequestData<Repos> & ComquestRequestError & ComquestRequestState;
  issues: ComquestRequestData<Issues> & ComquestRequestError & reducers.IssuesRequestState;
  collapsedRepos: reducers.CollapsedRepos;
}

const combinedReducers = combineReducers<StoreState>(reducers);

const appliedMiddleware = applyMiddleware(thunk, createComquestMiddleware({
  transformRequestData: (response) => response.data,
}));

const store = createStore(
  combinedReducers,
  appliedMiddleware
);

export default store;
