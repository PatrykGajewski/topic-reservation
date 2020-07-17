import React from 'react';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import csc, { ICountry, ICity, IState } from 'country-state-city';

import { UserPersonalValidation } from './validationSchema';

export interface UserPersonalValues {
  firstName: string,
  lastName: string,
  birthDate: string,
  country: string | null,
  state: string | null,
  city: string | null,
  zip: string,
  streetName: string,
  buildingNumber: string,
}

interface UserPersonalProps {
    values: UserPersonalValues,
    onSubmit: (values: UserPersonalValues) => void,
}

const UserPersonalForm = (props: UserPersonalProps) => (
  <Formik
    initialValues={props.values}
    onSubmit={props.onSubmit}
    validationSchema={UserPersonalValidation}
  >
    {({ values, errors, setFieldValue }) => (
      <Form>
        <Field name="firstName" />
        <ErrorMessage name="firstName" />

        <Field name="lastName" />
        <ErrorMessage name="lastName" />

        {/* complete birthDate */}
        {console.log(values)}

        <Field
          as="select"
          name="country"
          onChange={(e:any) => {
            // set field value
            setFieldValue('country', e.target.value);
            // assign first state from selected country
            const newStateId = csc.getStatesOfCountry(e.target.value)[0].id;
            setFieldValue('state', newStateId);
            // assign first city from first state
            const newCityId = csc.getCitiesOfState(newStateId)[0].id;
            setFieldValue('city', newCityId);
          }}
        >
          {csc.getAllCountries().map((country: ICountry) => (
            <option value={country.id}>{country.name}</option>
          ))}
        </Field>

        {values.country !== null && (
          <Field
            as="select"
            name="state"
            onChange={(e: any) => {
              const newStateId = csc.getStatesOfCountry(e.target.value)[0].id;
              // set field value
              setFieldValue('state', newStateId);
              // assign first city from selected state
              const newCityId = csc.getCitiesOfState(newStateId)[0].id;
              setFieldValue('city', newCityId);
            }}
          >
            {csc.getStatesOfCountry(values.country).map((state: IState) => (
              <option value={state.id}>{state.name}</option>
            ))}
          </Field>
        )}

        {values.state !== null && (
          <Field as="select" name="city">
            {csc.getCitiesOfState(values.state).map((city: ICity) => (
              <option value={city.id}>{city.name} </option>
            ))}
          </Field>
        )}
      </Form>
    )}

  </Formik>
);

export { UserPersonalForm };
