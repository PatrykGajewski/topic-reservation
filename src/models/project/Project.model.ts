import {ProjectStatus, ProjectDegree, ProjectType, ProjectReview} from "./models";
import {Tag} from "../tags";
import {SimplifiedUser} from "../../pages/private/main/services";

export interface Project {
  id: string,
  type: ProjectType,
  topic: string,
  description: string,
  degree: ProjectDegree,
  status: ProjectStatus,
  promoter: SimplifiedUser,
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
  reviews: ProjectReview[],
  owners: SimplifiedUser[],
  tags: Tag[],
  createdAt: Date,
  updatedAt: Date,
}
