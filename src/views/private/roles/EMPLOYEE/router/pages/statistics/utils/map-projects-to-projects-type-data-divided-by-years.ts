import { cloneDeep } from 'lodash';
import { Project, ProjectType } from '../../../../../../../../models/project';
import { ProjectTypeData, ProjectTypeDataGroup } from '../models';
import { updateProjectTypeDataGroupData } from './update-project-type-data-group-data';

const emptyData: ProjectTypeData = {
  [ProjectType.OVERVIEW_WORK]: 0,
  [ProjectType.TECHNOLOGICAL_WORK]: 0,
  [ProjectType.CONSTRUCTION_WORK]: 0,
  [ProjectType.RESEARCH_WORK]: 0,
};

export const mapProjectsToProjectsTypeDataDividedByYears = (
  numberOfYears: number,
  projects: Project[],
): ProjectTypeDataGroup[] => {
  const dataGroups: ProjectTypeDataGroup[] = [];

  for (let i = numberOfYears; i > 0; i--) {
    dataGroups.push({
      year: new Date().getFullYear() - i,
      data: cloneDeep(emptyData),
    });
  }

  const flatData: number[] = dataGroups.map((dataGroup: ProjectTypeDataGroup): number => dataGroup.year);
  projects.forEach((project: Project) => {
    // TODO adjust after database change
    const deadlineDateYear: number = new Date(project.createdAt).getFullYear();
    const indexInDataGroupsList: number = flatData.indexOf(deadlineDateYear);
    if (indexInDataGroupsList !== -1) {
      dataGroups[indexInDataGroupsList] = {
        ...dataGroups[indexInDataGroupsList],
        data: updateProjectTypeDataGroupData(dataGroups[indexInDataGroupsList].data, project),
      };
    }
  });

  return dataGroups;
};
