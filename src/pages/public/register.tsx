import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { isEmpty } from 'lodash';

import Loader from 'react-loader-spinner';
import styled from 'styled-components';
import RegisterForm, { RegisterFormValues } from './components/registerForm';
import { Container, RegisterFormContainer, ErrorWrapper } from './login';
import { API } from '../../API';
import { ViewState } from '../private/models';

import { UserGender } from '../../models/user';

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RegisterPage = (props: RouteComponentProps) => {
  const [viewState, setViewState] = useState<ViewState>(ViewState.OK);
  const [error, setError] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<{value: string, msg: string}[]>([]);
  const [formValues, setFormValues] = useState<RegisterFormValues>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    gender: UserGender.FEMALE,
  });

  const registerUser = (values: RegisterFormValues) => {
    setError(false);
    setViewState(ViewState.LOADING);
    setFormValues(values);

    API.post('/users/register', {
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      password: values.password,
      gender: values.gender,
    }).then(
      (res) => {
        if (!isEmpty(res) && res.status === 200) {
          props.history.push('/login');
        } else {
          setError(true);
          setErrorMessages(res.body.data);
          setViewState(ViewState.OK);
        }
      },
    ).catch(
      (err) => {
        setError(true);
        setErrorMessages(err.response.data);
        setViewState(ViewState.OK);
      },
    );
  };

  return (
    <Container>
      {viewState === ViewState.OK && (
        <RegisterFormContainer>
          <RegisterForm
            onSubmit={registerUser}
            initialValues={formValues}
          />
          {error && (
            errorMessages.map((err, index) => (
              <ErrorWrapper
                key={index}
              > {err.msg} </ErrorWrapper>
            ))
          )}
        </RegisterFormContainer>
      )}
      {viewState === ViewState.LOADING && (
        <StyledContainer>
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={50000}
          />
        </StyledContainer>
      )}
    </Container>
  );
};

export { RegisterPage };
