import React, { useEffect, useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import Select, { ValueType } from 'react-select';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { SelectOption } from 'models/forms';
import { useSelector } from 'react-redux';
import { AppState } from 'store/appState';
import { FinishedUniversityValidation } from './validationSchema';
import { FinishedUniversityValues } from '../models';
import { University, UniversityDegree } from 'models/university';
import {
  mapUniversitiesToOptions,
  mapUniversityDegreesToOptions,
  mapUniversityDepartmentsToOptions,
} from '../../utils/mappers';

interface Props {
  initialValues: FinishedUniversityValues,
  onSubmit: (values: FinishedUniversityValues) => void,
  handleClose: () => void,
}

interface State {
  universities: University[],
  degrees: UniversityDegree[],
}

const FinishedUniversityForm = (props: Props) => {
  const stateData: State = useSelector((state: AppState) => ({
    universities: state.universities,
    degrees: state.degrees,
  }));
  const [currentUniversityId, setCurrentUniversityId] = useState<string>(props.initialValues.universityId);
  const [universities, setUniversities] = useState<SelectOption[]>([]);
  const [departments, setDepartments] = useState<SelectOption[]>([]);
  const [degrees, setDegrees] = useState<SelectOption[]>([]);

  useEffect(() => {
    setUniversities(mapUniversitiesToOptions(stateData.universities));
    const currentUniversity: University | undefined = stateData.universities
      .find((uni: University) => uni.id === currentUniversityId);

    if (currentUniversity) {
      setDepartments(mapUniversityDepartmentsToOptions(currentUniversity.departments));
    }
  }, [stateData.universities]);

  useEffect(() => {
    const currentUniversity: University | undefined = stateData.universities
      .find((uni: University) => uni.id === currentUniversityId);

    if (currentUniversity) {
      setDepartments(mapUniversityDepartmentsToOptions(currentUniversity.departments));
    }
  }, [currentUniversityId]);

  useEffect(() => {
    setDegrees(mapUniversityDegreesToOptions(stateData.degrees));
  }, [stateData.degrees]);

  return (
    <Formik
      initialValues={props.initialValues}
      onSubmit={props.onSubmit}
      validationSchema={FinishedUniversityValidation}
    >
      {({
        values, setFieldValue, errors,
      }) => (
        <Form>
          {/* TODO remove errors console log */}
          {console.log(errors)}
          {universities.length > 0 && (
            <>
              <label htmlFor="universityId">
            Select university
              </label>
              <Select
                name="universityId"
                value={universities.filter((uni: SelectOption) => uni.value === values.universityId)}
                onChange={(value: ValueType<SelectOption>) => {
                  setFieldValue('universityId', value);

                  const selectedUniversityId: string = (value as SelectOption).value;
                  setCurrentUniversityId(selectedUniversityId);
                }}
                options={universities}
              />
              <ErrorMessage name="universityId" />
            </>
          )}
          {departments.length > 0 && (
            <>
              <label htmlFor="departmentId">
              Select department
              </label>
              <Select
                name="departmentId"
                value={departments
                  .filter((department: SelectOption) => department.value === values.departmentId)}
                onChange={(value: ValueType<SelectOption>) => setFieldValue('departmentId', value)}
                options={departments}
              />
              <ErrorMessage name="departmentId" />
            </>
          )}
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Start date"
              value={new Date(values.startDate)}
              onChange={(value) => setFieldValue('startDate', value)}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="End date"
              value={new Date(values.startDate)}
              onChange={(value) => setFieldValue('endDate', value)}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
          {degrees.length > 0 && (
            <>
              <label htmlFor="degreeId">
              Select degree
              </label>
              <Select
                name="degreeId"
                value={departments
                  .filter((degree: SelectOption) => degree.value === values.degreeId)}
                onChange={(value: ValueType<SelectOption>) => setFieldValue('degreeId', value)}
                options={degrees}
              />
              <ErrorMessage name="degreeId" />
            </>
          )}
        </Form>
      )}
    </Formik>
  );
};

export { FinishedUniversityForm };
