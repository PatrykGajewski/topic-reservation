import { UserModel } from '../models/user';
import {Project, Tag, ProjectType} from '../models/project';
import { University, UniversityDegree } from '../models/university';
import {SimplifiedUser} from "../views/private/roles/STUDENT/services";

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
  userProjects: Project[],
  tags: Tag[],
  promoters: SimplifiedUser[],
  availableProjects: {
    table : AvailableProjectsTableConfig
  }
}
