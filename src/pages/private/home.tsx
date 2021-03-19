import React from 'react';
import { Switch, RouteComponentProps, Route } from 'react-router-dom';

import { TopBar } from '../components';
import { LogoutPage } from './logoutPage';
import { AccountPage } from './account';
import { OwnedProjectsPage } from './owned/OwnedProjectsPage';
import { ProjectListPage } from './list';
import { PageContent } from '../public';

const HomePageAuth = (props: RouteComponentProps) => (
  <PageContent>
    <TopBar isAuthenticated />
    <div style={{
      height: 'calc(100% - 120px)'
    }}>
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
  </PageContent>
);

export { HomePageAuth };
