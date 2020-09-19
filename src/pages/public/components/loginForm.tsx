import React from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import styled from 'styled-components';
import { Button, TextField } from '@material-ui/core';

export const FieldWrapper = styled.div`
    margin-bottom: 20px;
`;

export const LoginFormFieldsLength = {
  login: {
    max: 100,
    min: 6,
  },
  password: {
    max: 30,
    min: 8,
  },
};

const LoginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter correct email address')
    .required('Email is required'),
  password: Yup.string()
    .min(
      LoginFormFieldsLength.password.min,
      `Password has at least ${LoginFormFieldsLength.password.min} characters`,
    )
    .max(
      LoginFormFieldsLength.password.max,
      `Password is limited to ${LoginFormFieldsLength.password.max} characters`,
    )
    .required('Password is required'),
});

interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: (formValues: LoginFormValues) => void
}

const LoginForm = (props: LoginFormProps) => (
  <Formik
    initialValues={{
      email: '',
      password: '',
    }}
    onSubmit={props.onSubmit}
    validationSchema={LoginValidationSchema}
  >
    {({
      handleChange, values, errors, touched,
    }) => (
      <Form>
        <FieldWrapper>
          <TextField
            name="email"
            helperText={touched.email && errors.email}
            error={touched.email && Boolean(errors.email)}
            label="Email"
            fullWidth
            value={values.email}
            onChange={handleChange}
            variant="outlined"
          />
        </FieldWrapper>
        <FieldWrapper>
          <TextField
            name="password"
            helperText={touched.password && errors.password}
            error={touched.password && Boolean(errors.password)}
            label="Password"
            fullWidth
            type="password"
            value={values.password}
            onChange={handleChange}
            variant="outlined"
          />
        </FieldWrapper>
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          fullWidth
        > Log me in
        </Button>
      </Form>
    )}
  </Formik>
);

export default LoginForm;
