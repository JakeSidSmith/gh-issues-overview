import { Container } from '@dabapps/roe';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from '^/client/app';
import store from '^/client/store';

ReactDOM.render(
  <Provider store={store}>
    <Container>
      <App />
    </Container>
  </Provider>,
  document.getElementById('app')
);
