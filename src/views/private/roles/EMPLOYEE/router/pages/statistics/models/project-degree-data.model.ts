import { ProjectDegree } from '../../../../../../../../models/project';

export interface ProjectsDegreeData {
  [ProjectDegree.ASSOCIATE_DEGREE]: number,
  [ProjectDegree.MASTER_DEGREE]: number,
  [ProjectDegree.DOCTORAL_DEGREE]: number,
  [ProjectDegree.BACHELOR_DEGREE]: number,
}
