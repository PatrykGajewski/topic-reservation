import { Route, Switch } from 'react-router-dom';
import React from 'react';
import { Props } from './models';
import { LogoutPage } from '../../REGISTERED_USER/router/pages/logout';
import { AccountPage } from '../../REGISTERED_USER';
import { StatisticsPage, ProjectListPage } from './pages';
import { PromotersRank } from './pages/promotersRanking';

export const EmployeeUserRouter = (props: Props) => (
  <Switch>
    <Route
      path="/logout"
      render={() => <LogoutPage logoutUser={props.logoutUser} />}
    />
    <Route
      path="/statistics"
      render={() => <StatisticsPage />}
    />
    <Route
      path="/projects"
      render={() => <ProjectListPage />}
    />
    <Route
      path="/promoters"
      render={() => <PromotersRank />}
    />
    <Route
      exact
      path="/"
      render={() => <AccountPage />}
    />
  </Switch>
);
