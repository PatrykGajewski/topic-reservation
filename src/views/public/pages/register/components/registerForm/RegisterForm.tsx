import React from 'react';
import { Form, Formik } from 'formik';
import { Button, TextField } from '@material-ui/core';
import { SimpleSelect } from '../../../../../components/forms';
import { genderOptions } from '../../../../../private/roles/REGISTERED_USER/router/pages/account/forms/config';
import { SelectOption } from '../../../../../../models/forms';
import { Props } from './models/props.model';
import { RegisterValidationSchema } from './validation';
import { ButtonWrapper, FieldsRow, FieldWrapper } from './styles';

const RegisterForm = (props: Props) => (
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
