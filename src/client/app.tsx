import { Button, Container } from '@dabapps/roe';
import React from 'react';

const App = () => {
  if (window.GITHUB_URL) {
    return (
      <a href={window.GITHUB_URL}>
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
      <Container>
        <p>
          Hello, World!
        </p>
        <form action="/logout" method="POST">
          <Button type="submit">
            Logout
          </Button>
        </form>
      </Container>
    );
  } else {
    return (
      <p className="error">
        Something has gone wrong...
      </p>
    );
  }
};

export default App;
