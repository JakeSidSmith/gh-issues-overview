import { Button, Container } from '@dabapps/roe';
import React, { PureComponent } from 'react';

import List from '^/client/list';

export default class App extends PureComponent {
  public render () {
    if (window.GITHUB_URL) {
      return (
        <a className="button primary" href={window.GITHUB_URL}>
          Login with GitHub
        </a>
      );
    } else if (window.ERROR_MESSAGE) {
      return (
        <p className="error">
          {window.ERROR_MESSAGE}
        </p>
      );
    } else if (window.AUTHORIZED) {
      return (
        <>
          <form action="/logout" method="POST">
            <Button type="submit">
              Logout
            </Button>
          </form>
          <List />
        </>
      );
    } else {
      return (
        <p className="error">
          Something has gone wrong...
        </p>
      );
    }
  }
}
