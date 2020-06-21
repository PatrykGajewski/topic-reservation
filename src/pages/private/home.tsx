import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import Authentication from '../../authentication';
import { TopBar } from '../components';

const HomePageAuth = (props: RouteComponentProps) => (
  <div>
    <TopBar isAuthenticated />
    <div>
      <button onClick={() => {
        Authentication.signOut(() => {});
        props.history.push('/');
      }}
      > Logout
      </button>
    </div>
    <nav>
      <ul>
        <li><Link to="/home"> Home </Link></li>
        <li><Link to="/account"> Account</Link></li>
        <li><Link to="/assigned"> Owned thesis</Link></li>
        <li><Link to="/list"> Thesis list</Link></li>
      </ul>
    </nav>
  </div>
);

export { HomePageAuth };
