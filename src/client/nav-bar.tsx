import {
  Button,
  Container,
  Nav,
  NavBar as RoeNavBar,
  NavItem,
} from '@dabapps/roe';
import React from 'react';

const NavBar = () => (
  <RoeNavBar shy>
    <Container>
      <h1 className="font-size-base display-inline-block margin-vertical-small">
        GitHub Issues Overview
      </h1>
      <Nav className="float-right">
        {
          Boolean(window.GITHUB_URL) && (
            <NavItem>
              <a href={window.GITHUB_URL}>
                Login with GitHub
              </a>
            </NavItem>
          )
        }
        {
          Boolean(window.AUTHORIZED) && (
            <NavItem>
              <form action="/logout" method="POST">
                <Button type="submit">
                  Logout
                </Button>
              </form>
            </NavItem>
          )
        }
      </Nav>
    </Container>
  </RoeNavBar>
);

export default NavBar;
