import React from 'react';
import {
  Formik, Form, ErrorMessage,
} from 'formik';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import TextField from '@material-ui/core/TextField';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
// NOTE For material-ui-pickers v3 use v1.x version of @date-io adapters.
// npm i @date-io/date-fns@1.x date-fns
import DateFnsUtils from '@date-io/date-fns';
import Select, { ValueType } from 'react-select';
import { SelectOption } from 'models/forms';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import { genderOptions } from './config';
import { FormElementsGroup } from '../../components';

import { UserPersonalValidation } from './validationSchema';
import { Footer, FooterButton } from '../../../components';
import { SimpleSelect } from '../../../components/forms';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
}));

export interface PersonalSectionValues {
  firstName: string,
  lastName: string,
  birthDate: string,
  country: string,
  region: string,
  city: string,
  zip: string,
  streetName: string,
  buildingNumber: string,
  flatNumber: string,
  gender: string,
}

interface UserPersonalProps {
    initialValues: PersonalSectionValues,
    onSubmit: (values: PersonalSectionValues) => void,
    handleClose: () => void,
}

const UserPersonalForm = (props: UserPersonalProps) => (
  <Formik
    initialValues={props.initialValues}
    onSubmit={props.onSubmit}
    validationSchema={UserPersonalValidation}
  >
    {({
      values, errors, setFieldValue, touched,
    }) => (
      <Form>
        <FormElementsGroup>
          <TextField
            variant="filled"
            name="firstName"
            label="First name"
            helperText={errors.firstName}
            error={Boolean(errors.firstName)}
            value={values.firstName}
            onChange={(e) => setFieldValue('firstName', e.currentTarget.value)}
          />
          <TextField
            variant="filled"
            name="lastName"
            label="Last name"
            helperText={touched.lastName ? errors.lastName : ''}
            error={touched.lastName && Boolean(errors.lastName)}
            value={values.lastName}
            onChange={(e) => setFieldValue('lastName', e.currentTarget.value)}
          />
        </FormElementsGroup>
        <SimpleSelect
          options={genderOptions}
          selectedOption={genderOptions.find((option) => option.value === values.gender) as SelectOption}
          handleChange={(value: string) => setFieldValue('gender', value)}
          id="gender"
          label="Select gender"
          labelId="genderLabel"
        />
        <ErrorMessage name="gender" />
        <FormElementsGroup>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Birth date"
              value={new Date(values.birthDate)}
              onChange={(value) => setFieldValue('birthDate', value)}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </FormElementsGroup>

        <FormElementsGroup>
          <CountryDropdown
            value={values.country}
            onChange={(value) => setFieldValue('country', value)}
          />
          <ErrorMessage name="country" />

          <RegionDropdown
            country={values.country}
            value={values.region}
            onChange={(value) => setFieldValue('region', value)}
          />
          <ErrorMessage name="region" />
        </FormElementsGroup>

        <FormElementsGroup>
          <TextField
            variant="filled"
            name="city"
            label="City"
            helperText={touched.city ? errors.city : ''}
            error={touched.city && Boolean(errors.city)}
            value={values.city}
            onChange={(e) => setFieldValue('city', e.currentTarget.value)}
          />

          <TextField
            variant="filled"
            name="zip"
            label="Zip code"
            helperText={touched.zip ? errors.zip : ''}
            error={touched.zip && Boolean(errors.zip)}
            value={values.zip}
            onChange={(e) => setFieldValue('zip', e.currentTarget.value)}
          />
        </FormElementsGroup>

        <FormElementsGroup>
          <TextField
            variant="filled"
            name="streetName"
            label="Street name"
            helperText={touched.streetName ? errors.streetName : ''}
            error={touched.streetName && Boolean(errors.streetName)}
            value={values.streetName}
            onChange={(e) => setFieldValue('streetName', e.currentTarget.value)}
          />

          <TextField
            variant="filled"
            name="buildingNumber"
            label="Building number"
            helperText={touched.buildingNumber ? errors.buildingNumber : ''}
            error={touched.buildingNumber && Boolean(errors.buildingNumber)}
            value={values.buildingNumber}
            onChange={(e) => setFieldValue('buildingNumber', e.currentTarget.value)}
          />
        </FormElementsGroup>
        <FormElementsGroup>
          <TextField
            variant="filled"
            name="flatNumber"
            label="Flat number"
            helperText={touched.flatNumber ? errors.flatNumber : ''}
            error={touched.flatNumber && Boolean(errors.flatNumber)}
            value={values.flatNumber}
            onChange={(e) => setFieldValue('flatNumber', e.currentTarget.value)}
          />
        </FormElementsGroup>
        <Footer>
          <FooterButton
            onClick={props.handleClose}
          >
            Close
          </FooterButton>
          <FooterButton
            primary
            type="submit"
          >
            Submit
          </FooterButton>
        </Footer>
      </Form>
    )}

  </Formik>
);

export { UserPersonalForm };
