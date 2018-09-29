import { AppRoot, Container } from '@dabapps/roe';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from '^/client/app';
import NavBar from '^/client/nav-bar';
import store from '^/client/store';

ReactDOM.render(
  <Provider store={store}>
    <AppRoot>
      <NavBar />
      <Container>
        <App />
      </Container>
    </AppRoot>
  </Provider>,
  document.getElementById('app')
);
