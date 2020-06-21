import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled, { css } from 'styled-components';

import Authentication, { LoginFormValues } from '../../authentication';
import LoginForm from './components/loginForm';
import { SIZES } from "../components/constants";
import BackgroundURL from '../../img/loginBg.jpg';


const ContainerBase = css`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${BackgroundURL});
`;

export const Container = styled.div`
  ${ContainerBase}
`;

const ContentContainer = styled.div`
  background-repeat: no-repeat;
  background-size: cover;
  max-height: 100%;
  height: calc(100% - ${SIZES.topBarHeight});
  ${ContainerBase}
`;

const FormContainer = css`
   background: #fffffff0;
   padding: 25px;
   border-radius: 8px;
   box-sizing: border-box;
`;

const LoginFormContainer = styled.div`
   width: 30%;
   height: fit-content;
   
   ${FormContainer} 
`;

export const RegisterFormContainer = styled.div`
  width: 50%;
  height: fit-content;
  margin: 10% auto;
  ${FormContainer}
`;

const ErrorWrapper = styled.div`
  margin-top: 20px;
  background: yellow;
`;

const LoginPage = (props: RouteComponentProps) => {
  const [authenticationError, setAuthenticationError] = useState(false);

  const userAuthenticationSuccess = () => {
    setAuthenticationError(false);
    props.history.push('/');
  };

  const authenticateUser = (userData: LoginFormValues) => {
    Authentication.verifyUser({
      user: userData,
      success: () => userAuthenticationSuccess(),
      error: () => setAuthenticationError(true),
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
