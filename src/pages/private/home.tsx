import React from 'react';
import { Switch, RouteComponentProps, Route } from 'react-router-dom';

import { TopBar } from '../components';
import { LogoutPage } from './logoutPage';
import { AccountPage } from './account';
import { OwnedProjectsPage } from './owned';
import { ProjectListPage } from './list';

const HomePageAuth = (props: RouteComponentProps) => (
  <div>
    <TopBar isAuthenticated />
    <Switch>
      <Route path="/logout" render={() => <LogoutPage />} />
      <Route
        path="/owned"
        render={() => (
          <OwnedProjectsPage />
        )}
      />
      <Route
        path="/list"
        render={() => (
          <ProjectListPage />
        )}
      />
      <Route path="/promoters" render={() => <div />} />
      <Route
        exact
        path="/"
        render={() => (
          <AccountPage />
        )}
      />
    </Switch>
  </div>

);

export { HomePageAuth };
