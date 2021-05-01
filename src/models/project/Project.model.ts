import {ProjectStatus, ProjectDegree, ProjectType, ProjectReview} from "./models";
import {Tag} from "../tags";
import {SimplifiedUser} from "../user";

export interface Project {
  id: string,
  type: ProjectType,
  topic: string,
  description: string,
  degree: ProjectDegree,
  status: ProjectStatus,
  promoter: SimplifiedUser,
  groupProject: boolean,
  university: {
    id: string,
    nameEN: {
      short: string,
      full: string,
    },
    namePL: {
      short: string,
      full: string,
    }
  },
  department: {
    id: string,
    nameEN: {
      short: string,
      full: string,
    },
    namePL: {
      short: string,
      full: string,
    }
  },
  cathedral: {
    id: string,
    nameEN: string,
    namePL: string,
  },
  reviews: string[],
  owners: SimplifiedUser[],
  reviewers: SimplifiedUser[],
  tags: Tag[],
  createdAt: Date,
  updatedAt: Date,
}
