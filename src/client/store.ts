import {
  ComquestRequestData,
  ComquestRequestError,
  ComquestRequestState,
  createComquestMiddleware,
} from 'comquest';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import * as reducers from '^/client/reducers';

export interface StoreState {
  repos: ComquestRequestData & ComquestRequestError & ComquestRequestState;
}

const combinedReducers = combineReducers<StoreState>(reducers);

const appliedMiddleware = applyMiddleware(thunk, createComquestMiddleware({}));

const store = createStore(
  combinedReducers,
  appliedMiddleware
);

export default store;
