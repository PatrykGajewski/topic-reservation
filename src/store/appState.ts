import { UserModel } from '../models/user';
import {ProjectModel, ProjectType} from '../models/project';
import { University, UniversityDegree } from '../models/university';

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
  error: any,
  universities: University[],
  degrees: UniversityDegree[],
  userProjects: ProjectModel[],
  availableProjects: {
    table : AvailableProjectsTableConfig
  }
}
