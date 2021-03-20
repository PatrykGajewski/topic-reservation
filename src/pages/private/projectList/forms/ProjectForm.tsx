import React, { RefObject } from 'react';
import {
  Formik, Form, ErrorMessage, FormikValues,
} from 'formik';
import TextField from '@material-ui/core/TextField';
import { ProjectType } from '../../../../models/project';
import { FieldsRow, FieldWrapper } from '../../../public/components/registerForm';
import {SimpleSelect} from "../../../components/forms";
import {SelectOption} from "../../../../models/forms";
import {projectTypeOptions} from "../ProjectListPage";

export interface ProjectFormValues {
  topic: string,
  description: string,
  type: ProjectType,
  tags: string[],
}

interface ProjectFormProps {
  initialValues: ProjectFormValues,
  onSubmit: (values: ProjectFormValues) => void,
  handleClose: () => void,
  submitBtnRef: RefObject<HTMLButtonElement>
}

export const ProjectForm = (props: ProjectFormProps) => (
  <Formik
    initialValues={props.initialValues}
    onSubmit={props.onSubmit}
  >
    {({
      values, errors, setFieldValue, touched,
    }) => (
      <Form>
        <FieldsRow>
          <FieldWrapper fullWidth>
            <TextField
              variant="outlined"
              name="topic"
              label="Project topic"
              fullWidth
              helperText={errors.topic}
              error={Boolean(errors.topic)}
              value={values.topic}
              onChange={(e) => setFieldValue('topic', e.currentTarget.value)}
            />
          </FieldWrapper>
        </FieldsRow>
        <FieldsRow>
          <FieldWrapper fullWidth>
            <TextField
              variant="outlined"
              name="description"
              label="Project description"
              fullWidth
              helperText={errors.description}
              error={Boolean(errors.description)}
              value={values.description}
              onChange={(e) => setFieldValue('description', e.currentTarget.value)}
            />
          </FieldWrapper>
        </FieldsRow>
        <FieldsRow>
          <FieldWrapper>
            <SimpleSelect
              id="type"
              labelId="projectTypeLabel"
              label="Select project type"
              selectedOption={projectTypeOptions.find((option: SelectOption) => option.value === values.type) as SelectOption}
              handleChange={(value: string) => {
                setFieldValue('type', value);
              }}
              options={projectTypeOptions}
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
