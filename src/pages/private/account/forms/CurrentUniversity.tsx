import React, { useEffect, useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import Select, { ValueType } from 'react-select';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { SelectOption } from 'models/forms';
import { useSelector } from 'react-redux';
import { CurrentUniversityValidation } from './validationSchema';
import { CurrentUniversityValues } from '../models';
import { mapUniversitiesToOptions, mapUniversityDepartmentsToOptions } from '../../utils/mappers';
import { University } from 'models/university';
import { AppState } from 'store/appState';

interface Props {
  initialValues: CurrentUniversityValues,
  onSubmit: (values: CurrentUniversityValues) => void,
  handleClose: () => void,
}

interface State {
  universities: University[]
}

export const CurrentUniversityForm = (props: Props) => {
  const stateData: State = useSelector((state: AppState) => ({
    universities: state.universities,
  }));
  const [currentUniversityId, setCurrentUniversityId] = useState<string>(props.initialValues.universityId);
  const [universities, setUniversities] = useState<SelectOption[]>([]);
  const [departments, setDepartments] = useState<SelectOption[]>([]);

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

  return (
    <Formik
      initialValues={props.initialValues}
      onSubmit={props.onSubmit}
      validationSchema={CurrentUniversityValidation}
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
        </Form>
      )}
    </Formik>
  );
};
