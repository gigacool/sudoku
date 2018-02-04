
import { applyMiddleware, compose, createStore, combineReducers } from 'redux';

import { sudoku } from './reducers/sudoku';

export default function configureStore() {

  return createStore(
    combineReducers({sudoku: sudoku}),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}
