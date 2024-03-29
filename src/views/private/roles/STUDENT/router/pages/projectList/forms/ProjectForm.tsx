import React, { RefObject } from 'react';
import { Formik, Form } from 'formik';
import TextField from '@material-ui/core/TextField';
import {ProjectDegree, ProjectType} from '../../../../../../../../models/project';
import { SimpleSelect } from '../../../../../../../components/forms';
import { SelectOption } from '../../../../../../../../models/forms';
import { ProjectFormValidationSchema } from './ProjectFormValidationSchema';
import { CathedralModel, DepartmentModel } from '../../../../../../../../models/university';
import {FieldsRow, FieldWrapper} from "../../../../../../../public/router/pages/register/components/registerForm/styles";
import {MultipleSelect} from "../../../../../../../components/forms/multiple-select";

export interface ProjectFormValues {
  topic: string,
  description: string,
  type: ProjectType,
  degree: ProjectDegree,
  tags: string[],
  promoter: string,
  department: string,
  university: string,
  cathedral: string,
}

interface ProjectFormProps {
  initialValues: ProjectFormValues,
  onSubmit: (values: ProjectFormValues) => void,
  tagsOptions: SelectOption[],
  promoters: SelectOption[],
  departmentsOptions: SelectOption[],
  universitiesOptions: SelectOption[],
  degreeOptions: SelectOption[],
  typeOptions: SelectOption[],
  handleClose: () => void,
  submitBtnRef: RefObject<HTMLButtonElement>
  departments: DepartmentModel[]
}

export const ProjectForm = (props: ProjectFormProps) => (
  <Formik
    initialValues={props.initialValues}
    onSubmit={props.onSubmit}
    validationSchema={ProjectFormValidationSchema}
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
              helperText={errors.topic && touched.topic}
              error={Boolean(errors.topic) && touched.topic}
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
              helperText={errors.description && touched.topic}
              error={Boolean(errors.description) && touched.description}
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
              selectedOption={props.typeOptions.find((option: SelectOption) => option.value === values.type) as SelectOption}
              handleChange={(value: string) => {
                setFieldValue('type', value);
              }}
              options={props.typeOptions}
            />
          </FieldWrapper>
          <FieldWrapper>
            <SimpleSelect
              id="degree"
              labelId="degreeLabel"
              label="Select project degree type"
              selectedOption={props.degreeOptions.find((option: SelectOption) => option.value === values.degree) as SelectOption}
              handleChange={(value: string) => {
                setFieldValue('degree', value);
              }}
              options={props.degreeOptions}
            />
          </FieldWrapper>
        </FieldsRow>
        <FieldsRow>
          <FieldWrapper>
            <SimpleSelect
              id="promoter"
              labelId="promoterLabel"
              label="Select promoter"
              selectedOption={props.promoters.find((option: SelectOption) => option.value === values.promoter) as SelectOption}
              handleChange={(value: string) => {
                setFieldValue('promoter', value);
              }}
              options={props.promoters}
            />
          </FieldWrapper>
          <FieldWrapper>
            <MultipleSelect
              options={props.tagsOptions}
              selectedOptions={values.tags}
              handleChange={(value: string[]) => setFieldValue('tags', value)}
              id="tag"
              labelId="tagLabel"
              label="Select project tags"
              />
          </FieldWrapper>
        </FieldsRow>
        <FieldsRow>
          <FieldWrapper>
            <SimpleSelect
              disabled
              id="university"
              labelId="universityLabel"
              label="Select University"
              selectedOption={props.universitiesOptions.find((option: SelectOption) => option.value === values.university) as SelectOption}
              handleChange={(value: string) => {
                setFieldValue('university', value);
              }}
              options={props.universitiesOptions}
            />
          </FieldWrapper>
          <FieldWrapper>
            <SimpleSelect
              id="department"
              labelId="departmentLabel"
              label="Select University Department"
              selectedOption={props.departmentsOptions.find((option: SelectOption) => option.value === values.department) as SelectOption}
              handleChange={(value: string) => {
                setFieldValue('department', value);
              }}
              options={props.departmentsOptions}
            />
          </FieldWrapper>
        </FieldsRow>
        <FieldsRow>
          <FieldWrapper>
            <SimpleSelect
              id="cathedral"
              labelId="cathedralLabel"
              label="Select Cathedral"
              selectedOption={
                (props.departments
                  .find((department: DepartmentModel) => department.id === values.department) as DepartmentModel)
                  .cathedrals
                  .map((cathedral: CathedralModel): SelectOption => ({ label: cathedral.namePL, value: cathedral.id }))
                  .find((option: SelectOption) => option.value === values.cathedral) as SelectOption
              }
              handleChange={(value: string) => {
                setFieldValue('cathedral', value);
              }}
              options={
                (props.departments
                  .find((department: DepartmentModel) => department.id === values.department) as DepartmentModel)
                  .cathedrals
                  .map((cathedral: CathedralModel): SelectOption => ({ label: cathedral.namePL, value: cathedral.id }))
              }
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
