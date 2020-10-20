import { ProjectOwnerModel } from './project-owner.model';
import { ProjectRating } from './project-rating.model';
import { UniversityDegree } from '../university/university-degree.model';
import { ProjectTag } from './project-tag.model';

export interface OwnedProject {
  id: string,
  type: string,
  topic: string,
  country: string,
  promoter: {
    id: string,
    firstName: string,
    lastName: string,
    highestTitle: UniversityDegree
  },
  // NOTE ownerId is duplicated but it is necessary to use (projects?universities=) path
  universityId: string,
  university: {
    id: string,
    name: {
      full: string,
      short: string,
    }
  },
  tags: ProjectTag[],
  addedDate: string,
  status: {
    selected: boolean,
    completed: boolean
  },
  // NOTE ownerId is duplicated but it is necessary to use (projects?ownerId=) path
  ownerId: string,
  owner: ProjectOwnerModel,
  rating: ProjectRating,
}
