import { UserModel } from '../models/user';
import {ProjectModel, ProjectTag, ProjectType} from '../models/project';
import { University, UniversityDegree } from '../models/university';
import {SimplifiedUser} from "../pages/private/main/services";

export interface AvailableProjectsTableConfig {
  lastPageIndex: number,
  pageIndex: number,
  searchString: string,
  projectType: ProjectType,
}

export interface AppState {
  user: UserModel,
  loading: boolean,
  success: boolean,
  error: boolean,
  universities: University[],
  degrees: UniversityDegree[],
  userProjects: ProjectModel[],
  tags: ProjectTag[],
  promoters: SimplifiedUser[],
  availableProjects: {
    table : AvailableProjectsTableConfig
  }
}
