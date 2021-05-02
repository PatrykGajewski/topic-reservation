import { cloneDeep } from 'lodash';
import { ProjectTypeData } from '../models';
import { Project, ProjectType } from '../../../../../../../../models/project';

export const updateProjectTypeDataGroupData = (dataGroup: ProjectTypeData, project: Project): ProjectTypeData => {
  const updatedData: ProjectTypeData = cloneDeep(dataGroup);

  switch (project.type) {
  case ProjectType.CONSTRUCTION_WORK:
    updatedData[ProjectType.CONSTRUCTION_WORK] += 1;
    break;
  case ProjectType.OVERVIEW_WORK:
    updatedData[ProjectType.OVERVIEW_WORK] += 1;
    break;
  case ProjectType.RESEARCH_WORK:
    updatedData[ProjectType.RESEARCH_WORK] += 1;
    break;
  case ProjectType.TECHNOLOGICAL_WORK:
    updatedData[ProjectType.TECHNOLOGICAL_WORK] += 1;
    break;
  }
  return updatedData;
};
