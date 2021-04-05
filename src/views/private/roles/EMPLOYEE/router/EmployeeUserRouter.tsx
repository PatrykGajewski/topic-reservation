import { Route, Switch } from 'react-router-dom';
import React from 'react';
import { Props } from './models';
import { LogoutPage } from '../../REGISTERED_USER/router/pages/logout';
import { AccountPage } from '../../REGISTERED_USER';
import {StatisticsPage} from "./pages";

export const EmployeeUserRouter = (props: Props) => (
  <Switch>
    <Route
      path="/logout"
      render={() => <LogoutPage logoutUser={props.logoutUser} />}
    />
    <Route
      path="/statistics"
      render={() => (<StatisticsPage />)}
    />
    <Route
      exact
      path="/"
      render={() => (<AccountPage />)}
    />
  </Switch>
);
