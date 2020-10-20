import { UniversityDegree } from '../university';

export interface ProjectOwnerModel {
  id: string,
  firstName: string,
  lastName: string,
  highestTitle: UniversityDegree,
}
