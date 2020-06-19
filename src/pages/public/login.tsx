import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Authentication from '../../authentication';

const LoginPage = (props: RouteComponentProps) => (
  <button onClick={() => {
    Authentication.signIn(() => {});
    props.history.push('/');
  }}
  > Login
  </button>
);

export { LoginPage };
