import { Route, Switch } from 'react-router-dom';
import React from 'react';
import { LogoutPage } from './pages/logout';
import { AccountPage } from './pages';
import { Props } from './models';

export const RegisteredUserRouter = (props: Props) => (
  <Switch>
    <Route
      path="/logout"
      render={() => <LogoutPage logoutUser={props.logoutUser} />}
    />
    <Route
      exact
      path="/"
      render={() => (
        <AccountPage />
      )}
    />
  </Switch>
);
