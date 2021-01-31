import React from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Button, TextField } from '@material-ui/core';

import { UserGender } from '../../../models/user';
import { SimpleSelect } from '../../components/forms';
import { genderOptions } from '../../private/account/forms/config';
import { SelectOption } from '../../../models/forms';
import styled from "styled-components";

const FieldsLength = {
  firstName: {
    max: 30,
    min: 2,
  },
  lastName: {
    max: 30,
    min: 2,
  },
  password: {
    max: 30,
    min: 8,
  },
};

const RegisterValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(FieldsLength.firstName.min, `Please enter at least ${FieldsLength.firstName.min} characters`)
    .max(FieldsLength.firstName.max, `Field is limited to ${FieldsLength.firstName.max}`)
    .required('First Name is required'),
  lastName: Yup.string()
    .min(FieldsLength.lastName.min, `Please enter at least ${FieldsLength.lastName.min} characters`)
    .max(FieldsLength.lastName.max, `Field is limited to ${FieldsLength.lastName.max}`)
    .required('Last Name is required'),
  email: Yup.string()
    .email('Please enter correct email address')
    .required('Email is required field'),
  password: Yup.string()
    .min(FieldsLength.password.min, `Please enter at least ${FieldsLength.password.min} characters`)
    .max(FieldsLength.password.max, `Password is limited to ${FieldsLength.password.max} characters`)
    .required('Password is required field'),
  passwordConfirmation: Yup.string()
    .min(FieldsLength.password.min, `Please enter at least ${FieldsLength.password.min} characters`)
    .max(FieldsLength.password.max, `Password is limited to ${FieldsLength.password.max} characters`)
    .test(
      'passwords equality test',
      'Entered passwords are not equal',
      function (password) {
        return password === this.parent.password;
      },
    )
    .required('Password is required field'),
});

export interface RegisterFormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    gender: UserGender
}

interface RegisterFormProps {
    onSubmit: (values: RegisterFormValues) => void
    initialValues: RegisterFormValues,
}

export const FieldsRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

export const FieldWrapper = styled.div`
  min-width: 50%;
  padding: 0 12px;
  box-sizing: border-box;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  padding: 0 12px;
  box-sizing: border-box;
`;

const RegisterForm = (props: RegisterFormProps) => (
  <Formik
    initialValues={props.initialValues}
    onSubmit={(values) => props.onSubmit(values)}
    validationSchema={RegisterValidationSchema}
  >
    {({
      handleChange, values, errors, touched, setFieldValue,
    }) => (
      <Form>
        <FieldsRow>
          <FieldWrapper>
            <TextField
              name="firstName"
              variant="outlined"
              helperText={touched.firstName && errors.firstName}
              error={touched.firstName && Boolean(errors.firstName)}
              label="First Name"
              value={values.firstName}
              onChange={handleChange}
              fullWidth
            />
          </FieldWrapper>
          <FieldWrapper>
            <TextField
              name="lastName"
              variant="outlined"
              helperText={touched.lastName && errors.lastName}
              error={touched.lastName && Boolean(errors.lastName)}
              label="Last Name"
              fullWidth
              value={values.lastName}
              onChange={handleChange}
            />
          </FieldWrapper>
        </FieldsRow>
        <FieldsRow>
          <FieldWrapper>
            <SimpleSelect
              options={genderOptions}
              selectedOption={genderOptions.find((option) => option.value === values.gender) as SelectOption}
              handleChange={(value: string) => setFieldValue('gender', value)}
              id="gender"
              label="Select gender"
              labelId="genderLabel"
            />
          </FieldWrapper>
          <FieldWrapper>
            <TextField
              type="email"
              name="email"
              variant="outlined"
              helperText={touched.email && errors.email}
              error={touched.email && Boolean(errors.email)}
              label="Email"
              fullWidth
              value={values.email}
              onChange={handleChange}
            />
          </FieldWrapper>
        </FieldsRow>
        <FieldsRow>
          <FieldWrapper>
            <TextField
              type="password"
              name="password"
              variant="outlined"
              helperText={touched.password && errors.password}
              error={touched.password && Boolean(errors.password)}
              label="Password"
              fullWidth
              value={values.password}
              onChange={handleChange}
            />
          </FieldWrapper>
          <FieldWrapper>
            <TextField
              type="password"
              name="passwordConfirmation"
              variant="outlined"
              helperText={touched.passwordConfirmation && errors.passwordConfirmation}
              error={touched.passwordConfirmation && Boolean(errors.passwordConfirmation)}
              label="Password Confirmation"
              fullWidth
              value={values.passwordConfirmation}
              onChange={handleChange}
            />
          </FieldWrapper>
        </FieldsRow>
        <ButtonWrapper>
          <Button
            type="submit"
            variant="outlined"
            color="primary"
            fullWidth
          >
            Register
          </Button>
        </ButtonWrapper>
      </Form>
    )}
  </Formik>
);

export default RegisterForm;
