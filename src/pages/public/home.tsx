import React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';

import { RegisterPage } from './register';
import { LoginPage } from './login';
import {
  LogoContainer, Menu, MenuContainer, TopBar, AccountMenu,
} from '../components';

const HomePage = (props: RouteComponentProps) => (
  <div>
    <TopBar>
      <LogoContainer />
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
    <Route path="/register" render={(props) => <RegisterPage {...props} />} />
    <Route path="/login" render={(props) => <LoginPage {...props} />} />
  </div>

);

export { HomePage };
