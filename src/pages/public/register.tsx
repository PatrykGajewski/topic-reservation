import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Authentication from '../../authentication';

const RegisterPage = (props: RouteComponentProps) => (
  <button onClick={() => {
    Authentication.signIn(() => {});
    props.history.push('/login');
  }}
  > Register user
  </button>
);

export { RegisterPage };
