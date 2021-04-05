import React, { RefObject } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import TextField from '@material-ui/core/TextField';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
// NOTE For material-ui-pickers v3 use v1.x version of @date-io adapters.
// npm i @date-io/date-fns@1.x date-fns
import DateFnsUtils from '@date-io/date-fns';
import { SelectOption } from 'models/forms';
import { genderOptions } from './config';

import { UserPersonalDataValidation } from './validationSchema';
import { SimpleSelect } from '../../../../../../../components/forms';
import {FieldsRow, FieldWrapper} from "../../../../../../../public/pages/register/components/registerForm/styles";

export interface PersonalDataFormValues {
  firstName: string,
  lastName: string,
  birthDate: Date | null,
  country: string,
  city: string,
  zip: string,
  streetName: string,
  buildingNumber: string,
  flatNumber: string,
  gender: string,
}

interface UserPersonalProps {
    initialValues: PersonalDataFormValues,
    onSubmit: (values: PersonalDataFormValues) => void,
    handleClose: () => void,
    submitBtnRef: RefObject<HTMLButtonElement>,
}

export const countryOptions: SelectOption[] = [{
  label: 'Polska',
  value: 'PL',
}, {
  label: 'Anglia',
  value: 'EN',
}];

const UserPersonalDataForm = (props: UserPersonalProps) => (
  <Formik
    initialValues={props.initialValues}
    onSubmit={props.onSubmit}
    validationSchema={UserPersonalDataValidation}
  >
    {({
      values, errors, setFieldValue, touched,
    }) => (
      <Form>
        <FieldsRow>
          <FieldWrapper>
            <TextField
              variant="outlined"
              name="firstName"
              label="First name"
              fullWidth
              helperText={errors.firstName}
              error={Boolean(errors.firstName)}
              value={values.firstName}
              onChange={(e) => setFieldValue('firstName', e.currentTarget.value)}
            />
          </FieldWrapper>
          <FieldWrapper>
            <TextField
              variant="outlined"
              name="lastName"
              label="Last name"
              fullWidth
              helperText={touched.lastName ? errors.lastName : ''}
              error={touched.lastName && Boolean(errors.lastName)}
              value={values.lastName}
              onChange={(e) => setFieldValue('lastName', e.currentTarget.value)}
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
            <ErrorMessage name="gender" />
          </FieldWrapper>
          <FieldWrapper>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="dialog"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Birth date"
                // @ts-ignore
                value={new Date(values.birthDate)}
                onChange={(value) => setFieldValue('birthDate', value)}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </FieldWrapper>
        </FieldsRow>
        <FieldsRow>
          <FieldWrapper>
            <SimpleSelect
              options={countryOptions}
              selectedOption={countryOptions.find((option) => option.value === values.country) as SelectOption}
              handleChange={(value: string) => setFieldValue('country', value)}
              id="country"
              label="Select country"
              labelId="countryLabel"
            />
          </FieldWrapper>
        </FieldsRow>
        <FieldsRow>
          <FieldWrapper>
            <TextField
              variant="outlined"
              name="city"
              label="City"
              fullWidth
              helperText={touched.city ? errors.city : ''}
              error={touched.city && Boolean(errors.city)}
              value={values.city}
              onChange={(e) => setFieldValue('city', e.currentTarget.value)}
            />
          </FieldWrapper>
          <FieldWrapper>
            <TextField
              variant="outlined"
              name="zip"
              label="Zip code"
              fullWidth
              helperText={touched.zip ? errors.zip : ''}
              error={touched.zip && Boolean(errors.zip)}
              value={values.zip}
              onChange={(e) => setFieldValue('zip', e.currentTarget.value)}
            />
          </FieldWrapper>
        </FieldsRow>
        <FieldsRow>
          <FieldWrapper>
            <TextField
              variant="outlined"
              name="streetName"
              label="Street name"
              fullWidth
              helperText={touched.streetName ? errors.streetName : ''}
              error={touched.streetName && Boolean(errors.streetName)}
              value={values.streetName}
              onChange={(e) => setFieldValue('streetName', e.currentTarget.value)}
            />
          </FieldWrapper>
          <FieldWrapper>
            <TextField
              variant="outlined"
              name="buildingNumber"
              label="Building number"
              fullWidth
              helperText={touched.buildingNumber ? errors.buildingNumber : ''}
              error={touched.buildingNumber && Boolean(errors.buildingNumber)}
              value={values.buildingNumber}
              onChange={(e) => setFieldValue('buildingNumber', e.currentTarget.value)}
            />
          </FieldWrapper>
        </FieldsRow>
        <FieldsRow>
          <FieldWrapper>
            <TextField
              variant="outlined"
              name="flatNumber"
              label="Flat number"
              fullWidth
              helperText={touched.flatNumber ? errors.flatNumber : ''}
              error={touched.flatNumber && Boolean(errors.flatNumber)}
              value={values.flatNumber}
              onChange={(e) => setFieldValue('flatNumber', e.currentTarget.value)}
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

export { UserPersonalDataForm };
