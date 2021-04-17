import { UserModel } from '../models/user';
import {Project, Tag, ProjectType, ProjectDegree, ProjectStatus} from '../models/project';
import { University, UniversityDegree } from '../models/university';
import {SimplifiedUser} from "../views/private/roles/STUDENT/services";
import {RoleInProject} from "../views/private/roles/EMPLOYEE/router/pages";

export interface ProjectsTableConfig {
  total: number,
  pageIndex: number,
  rowsPerPage: number,
  searchString: string,
  projectsTypes: ProjectType[],
  projectsDegrees: ProjectDegree[],
  projectsStatuses: ProjectStatus[],
  roleInProjects: RoleInProject,
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
    table : ProjectsTableConfig
  }
}
