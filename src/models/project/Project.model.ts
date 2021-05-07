import {ProjectStatus, ProjectDegree, ProjectType, ProjectReview} from "./models";
import {Tag} from "../tags";
import {SimplifiedUser} from "../user";
import {SimplifiedUserWithOpinions} from "../../views/private/roles/EMPLOYEE/router/pages/promotersRanking/services";

export interface Project {
  id: string,
  type: ProjectType,
  topic: string,
  description: string,
  degree: ProjectDegree,
  status: ProjectStatus,
  promoter: SimplifiedUserWithOpinions,
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
  createdAt: string,
  updatedAt: string,
}
