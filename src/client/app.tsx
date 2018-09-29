import React, { PureComponent } from 'react';

import List from '^/client/list';

export default class App extends PureComponent {
  public render () {
    if (window.GITHUB_URL) {
      return null;
    } else if (window.ERROR_MESSAGE) {
      return (
        <p className="error">
          {window.ERROR_MESSAGE}
        </p>
      );
    } else if (window.AUTHORIZED) {
      return (
        <List />
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
