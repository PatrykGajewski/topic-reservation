import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { RegisterPage } from '../register/RegisterPage';
import { LoginPage } from '../login/LoginPage';
import { MainPage } from '../main/MainPage';
import { TopBar } from '../../components';
import { Props } from './models';
import {PageContainer} from "../../components/styles/PageContainer";

export const PublicPagesRouter = (props: Props) => (
  <PageContainer>
    <TopBar isAuthenticated={false} />
    <Switch>
      <Route exact path="/" render={() => <MainPage />} />
      <Route path="/register" render={(routeProps) => <RegisterPage {...routeProps} />} />
      <Route path="/login" render={(routeProps) => <LoginPage loginUser={props.loginUser} {...routeProps} />} />
    </Switch>
  </PageContainer>
);
