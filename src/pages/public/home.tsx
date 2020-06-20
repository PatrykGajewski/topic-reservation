import React from 'react';
import {
  Route, RouteComponentProps, Link, Switch,
} from 'react-router-dom';
import styled from 'styled-components';

import { RegisterPage } from './register';
import { LoginPage } from './login';
import { MainPage } from './main';

import {
  LogoContainer, Menu, MenuContainer, TopBar, AccountMenu,
} from '../components';

const PageContent = styled.div`
    height: 100%;
`;

const HomePage = (props: RouteComponentProps) => (
  <PageContent>
    <TopBar>
      <Link to="/">
        <LogoContainer />
      </Link>
      <div style={{ width: '100%' }}>
        <AccountMenu />
        <MenuContainer>
          <Menu
            itemsNumber={4}
          >
            <li><a href="#home"> Home </a></li>
            <li><a href="#vision"> Vision </a></li>
            <li><a href="#participation"> Participation </a></li>
            <li><a href="#news"> News </a></li>
          </Menu>
        </MenuContainer>

      </div>

    </TopBar>
    <Switch>
      <Route exact path="/" render={() => <MainPage />} />
      <Route path="/register" render={(props) => <RegisterPage {...props} />} />
      <Route path="/login" render={(props) => <LoginPage {...props} />} />
    </Switch>
  </PageContent>

);

export { HomePage };
