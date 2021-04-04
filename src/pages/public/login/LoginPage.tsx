import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import LoginForm from './components/loginForm/LoginForm';
import { Props } from './models';
import { ContentContainer, ErrorWrapper, LoginFormContainer } from './styles';
import {LoginFormValues} from "./components/loginForm/models/login-form-values.model";

const LoginPage = (props: Props) => {
  const history = useHistory();
  const [authenticationError, setAuthenticationError] = useState(false);

  const authenticateUser = (values: LoginFormValues) => {
    props.loginUser(values)
      .then(() => {
        history.push('/');
      })
      .catch((error) => {
        setAuthenticationError(true);
      });
  };

  return (
    <ContentContainer>
      <LoginFormContainer>
        <LoginForm
          onSubmit={authenticateUser}
        />
        {authenticationError && (
          <ErrorWrapper> It seems that login or password is incorrect </ErrorWrapper>
        )}
      </LoginFormContainer>
    </ContentContainer>
  );
};

export { LoginPage };
