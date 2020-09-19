import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import { isEmpty } from 'lodash';

import { BACKEND_API_URL } from '../../authentication/constants';
import RegisterForm, { RegisterFormValues } from './components/registerForm';
import { Container, RegisterFormContainer } from './login';

const RegisterPage = (props: RouteComponentProps) => {
  // TODO display error below form
  const [errorOccur, setErrorOccur] = useState(false);

  const registerUser = (values: RegisterFormValues) => {
    axios.post(`${BACKEND_API_URL}/users`, {
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      password: values.password,
      roles: [],
      academicTitles: [],
      finishedUniversities: [],
      actualStatus: {},
    }, {
      headers: {
        'Content-Type': 'application/json',
      },

    }).then(
      (res) => {
        if (!isEmpty(res)) {
          props.history.push('/login');
        } else {
          setErrorOccur(true);
        }
      },
    ).catch(
      (err) => {
          setErrorOccur(true);
      },
    );
  };

  return (
    <Container>
      <RegisterFormContainer>
        <RegisterForm
          onSubmit={registerUser}
        />
      </RegisterFormContainer>
    </Container>
  );
};

export { RegisterPage };
