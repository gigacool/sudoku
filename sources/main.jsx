import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom'

import configureStore from './store';
import Application from './containers/Application';

/* 
 * Render function is defined so it can be called whenever hot-reload
 * is enabled. Hot reload should not be made available in production mode.
*/
function render(Root) {
  ReactDOM.render(<AppContainer>
    <Root
      history={BrowserRouter}
      store={configureStore()}
    />
  </AppContainer>,
  document.getElementById('root') );
}

if (module.hot) {
  module.hot.accept('./containers/Application', () => {
    render(require('./containers/Application').default);
  });
}

render(Application);
