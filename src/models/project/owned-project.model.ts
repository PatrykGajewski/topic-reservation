import { ProjectOwnerModel } from './project-owner.model';
import { ProjectRating } from './project-rating.model';
import { ProjectTag } from './project-tag.model';

// TODO create proper place for below enums
export enum ProjectType {
  RESEARCH_WORK = 'RESEARCH_WORK',
  TECHNOLOGICAL_WORK = 'TECHNOLOGICAL_WORK',
  CONSTRUCTION_WORK = 'CONSTRUCTION_WORK',
  OVERVIEW_WORK = 'OVERVIEW_WORK',
}

export enum ProjectStatus {
  CREATED = 'CREATED',
  PUBLISHED = 'PUBLISHED',
  RESERVED = 'RESERVED',
  FINISHED = 'FINISHED'
}

export interface ProjectModel {
  id: string,
  type: ProjectType,
  topic: string,
  description: string,
  promoter: {
    id: string,
    firstName: string,
    lastName: string,
  },
  university: {
    id: string,
    nameEN: {
      full: string,
      short: string,
    },
    namePL: {
      full: string,
      short: string,
    }
  },
  department: {
    id: string,
    nameEN: {
      full: string,
      short: string,
    },
    namePL: {
      full: string,
      short: string,
    }
  }
  cathedral: {
    id: string,
    nameEN: string,
    namePL: string
  }
  tags: ProjectTag[],
  status: ProjectStatus,
  owners: ProjectOwnerModel[],
  rating: ProjectRating,
  createdAt: string,
  updatedAt: string,
}
