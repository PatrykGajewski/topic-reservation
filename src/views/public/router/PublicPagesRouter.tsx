import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { RegisterPage } from '../pages/register/RegisterPage';
import { LoginPage } from '../pages/login/LoginPage';
import { MainPage } from '../pages/main/MainPage';
import { StaticTopBar } from '../../components';
import { Props } from './models';
import {PageContainer} from "../../components/styles/PageContainer";

export const PublicPagesRouter = (props: Props) => (
  <PageContainer>
    <StaticTopBar />
    <Switch>
      <Route exact path="/" render={() => <MainPage />} />
      <Route path="/register" render={(routeProps) => <RegisterPage {...routeProps} />} />
      <Route path="/login" render={(routeProps) => <LoginPage loginUser={props.loginUser} {...routeProps} />} />
    </Switch>
  </PageContainer>
);
