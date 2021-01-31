import React from 'react';
import {
  Route, RouteComponentProps, Switch,
} from 'react-router-dom';
import styled from 'styled-components';

import { RegisterPage } from './register';
import { LoginPage } from './login';
import { MainPage } from './main';
import {TopBar} from '../components';

const PageContent = styled.div`
    height: 100%;
`;

const HomePage = (props: RouteComponentProps) => (
  <PageContent>
    <TopBar isAuthenticated={false} />
    <Switch>
      <Route exact path="/" render={() => <MainPage />} />
      <Route path="/register" render={(props) => <RegisterPage {...props} />} />
      <Route path="/login" render={(props) => <LoginPage {...props} />} />
    </Switch>
  </PageContent>

);

export { HomePage };
