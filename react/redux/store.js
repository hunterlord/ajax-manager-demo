import { useMemo } from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import reducers from '@/redux/reducers';

let store;

function createReducer(asyncReducers) {
  let r = {};

  Object.keys(asyncReducers).forEach((key) => {
    if (typeof asyncReducers[key] === 'function') {
      r[key] = asyncReducers[key];
    } else {
      r[key] = combineReducers(asyncReducers[key]);
    }
  });

  return combineReducers({
    ...reducers,
    ...r,
  });
}

function initStore(initialState) {
  const store = createStore(
    combineReducers(reducers),
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
  // Add a dictionary to keep track of the registered async reducers
  store.asyncReducers = {};

  // Create an inject reducer function
  // This function adds the async reducer, and creates a new combined reducer
  store.injectReducer = (key, asyncReducer) => {
    if (store.asyncReducers[key] && typeof store.asyncReducers[key] === 'object') {
      store.asyncReducers[key] = {
        ...store.asyncReducers[key],
        ...asyncReducer,
      };
    } else {
      store.asyncReducers[key] = asyncReducer;
    }
    store.replaceReducer(createReducer(store.asyncReducers));
  };

  return store;
}

function initializeStore(preloadedState) {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
}

function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}

export { useStore, initializeStore, store };
