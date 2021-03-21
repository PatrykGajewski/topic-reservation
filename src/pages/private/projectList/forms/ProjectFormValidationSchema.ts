import * as Yup from 'yup';
import { ProjectType } from '../../../../models/project';

export const ProjectFormValidationSchema = Yup.object().shape({
  topic: Yup.string()
    .required(),
  description: Yup.string()
    .required(),
  type: Yup.mixed()
    .oneOf([ProjectType.RESEARCH_WORK, ProjectType.TECHNOLOGICAL_WORK, ProjectType.CONSTRUCTION_WORK, ProjectType.OVERVIEW_WORK]),
  tag: Yup.string()
    .required(),
  university: Yup.string()
    .required(),
  department: Yup.string()
    .required(),
});
