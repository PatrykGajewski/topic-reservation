import React, { RefObject } from 'react';
import { Form, Formik } from 'formik';
import TextField from '@material-ui/core/TextField';

import { UserContactDataValidation } from './validationSchema';
import {FieldsRow, FieldWrapper} from "../../../../../../public/register/components/registerForm/styles";

export interface ContactDataFormValues {
  contactEmail: string,
  phoneNumber: string,
}

interface UserContactDataFormProps {
  initialValues: ContactDataFormValues,
  onSubmit: (values: ContactDataFormValues) => void,
  handleClose: () => void,
  submitBtnRef: RefObject<HTMLButtonElement>,
}

export const UserContactDataForm = (props: UserContactDataFormProps) => (
  <Formik
    initialValues={props.initialValues}
    onSubmit={props.onSubmit}
    validationSchema={UserContactDataValidation}
  >
    {({
      values, errors, setFieldValue, touched,
    }) => (
      <Form>
        <FieldsRow>
          <FieldWrapper>
            <TextField
              variant="outlined"
              name="contactEmail"
              label="Contact email"
              fullWidth
              helperText={errors.contactEmail && touched.contactEmail}
              error={Boolean(errors.contactEmail) && touched.contactEmail}
              value={values.contactEmail}
              onChange={(e) => setFieldValue('contactEmail', e.currentTarget.value)}
            />
          </FieldWrapper>
          <FieldWrapper>
            <TextField
              variant="outlined"
              name="phoneNumber"
              label="Phone number"
              fullWidth
              helperText={errors.phoneNumber && touched.phoneNumber}
              error={Boolean(errors.phoneNumber) && touched.phoneNumber}
              value={values.phoneNumber}
              onChange={(e) => setFieldValue('phoneNumber', e.currentTarget.value)}
            />
          </FieldWrapper>
        </FieldsRow>
        <button
          type="submit"
          ref={props.submitBtnRef}
          style={{
            opacity: 0,
          }}
        />
      </Form>
    )}
  </Formik>
);
