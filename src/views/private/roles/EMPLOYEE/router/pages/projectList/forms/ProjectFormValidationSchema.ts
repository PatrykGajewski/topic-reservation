import * as Yup from 'yup';
import {ProjectStatus, ProjectType} from '../../../../../../../../models/project';

export const ProjectFormValidationSchema = Yup.object().shape({
  topic: Yup.string()
    .required(),
  description: Yup.string()
    .required(),
  type: Yup.mixed()
    .oneOf([ProjectType.RESEARCH_WORK, ProjectType.TECHNOLOGICAL_WORK, ProjectType.CONSTRUCTION_WORK, ProjectType.OVERVIEW_WORK]),
  tags: Yup.array(Yup.string()),
  university: Yup.string()
    .required(),
  department: Yup.string()
    .required(),
  cathedral: Yup.string()
    .required(),
  promoter: Yup.string()
    .required(),
  reviewers: Yup.array(Yup.string()),
  status: Yup.mixed()
    .oneOf([ProjectStatus.AVAILABLE, ProjectStatus.RESERVED, ProjectStatus.DRAFT, ProjectStatus.FINISHED])
    .required(),
  groupProject: Yup.mixed()
    .oneOf(['false', 'true'])
    .required()
});
