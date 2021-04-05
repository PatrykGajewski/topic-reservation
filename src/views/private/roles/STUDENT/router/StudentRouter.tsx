import { Route, Switch } from 'react-router-dom';
import React from 'react';
import { LogoutPage } from '../../REGISTERED_USER/router/pages/logout';
import { OwnedProjectsPage } from './pages/ownedProjectList';
import { ProjectListPage } from './pages/projectList/ProjectListPage';
import { AccountPage } from '../../REGISTERED_USER';
import { Props } from './models';

export const StudentRouter = (props: Props) => (
  <Switch>
    <Route path="/logout" render={() => <LogoutPage logoutUser={props.logoutUser} />} />
    <Route
      path="/owned"
      render={() => (
        <OwnedProjectsPage />
      )}
    />
    <Route
      path="/projects"
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
);
