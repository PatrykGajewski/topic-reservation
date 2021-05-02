import { Project, ProjectDegree } from '../../../../../../../../models/project';
import { ProjectsDegreeData } from '../models';

export const mapProjectsToProjectsDegreeData = (
  projects: Project[],
): ProjectsDegreeData => {
  const initailData: ProjectsDegreeData = {
    [ProjectDegree.BACHELOR_DEGREE]: 0,
    [ProjectDegree.MASTER_DEGREE]: 0,
    [ProjectDegree.ASSOCIATE_DEGREE]: 0,
    [ProjectDegree.DOCTORAL_DEGREE]: 0,
  };

  projects.forEach((project: Project) => {
    switch (project.degree) {
    case ProjectDegree.ASSOCIATE_DEGREE:
      initailData[ProjectDegree.ASSOCIATE_DEGREE] += 1;
      break;
    case ProjectDegree.BACHELOR_DEGREE:
      initailData[ProjectDegree.BACHELOR_DEGREE] += 1;
      break;
    case ProjectDegree.DOCTORAL_DEGREE:
      initailData[ProjectDegree.DOCTORAL_DEGREE] += 1;
      break;
    case ProjectDegree.MASTER_DEGREE:
      initailData[ProjectDegree.MASTER_DEGREE] += 1;
      break;
    }
  });

  return initailData;
};
