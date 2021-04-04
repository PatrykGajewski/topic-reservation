import React from 'react';
import { Form, Formik } from 'formik';
import { Button, TextField } from '@material-ui/core';
import { FieldWrapper } from './styles';
import { LoginFormProps } from './models';
import { LoginValidationSchema } from './validation';

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
