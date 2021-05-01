import {SimplifiedUser, UserDegree, UserModel} from '../models/user';
import {Project, Tag, ProjectType, ProjectDegree, ProjectStatus} from '../models/project';
import { University} from '../models/university';
import {RoleInProject} from "../views/private/roles/EMPLOYEE/router/pages";
import {Order} from "../views/private/roles/EMPLOYEE/router/pages/promotersRanking/services";

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

export interface PromotersRankConfig {
  total: number,
  pageIndex: number,
  rowsPerPage: number,
  order: Order,
}

export interface AppState {
  user: UserModel,
  loading: boolean,
  success: boolean,
  error: boolean,
  universities: University[],
  degrees: UserDegree[],
  userProjects: Project[],
  tags: Tag[],
  promoters: SimplifiedUser[],
  students: SimplifiedUser[],
  projectsListView: {
    table : ProjectsTableConfig
  },
  promotersListView: PromotersRankConfig,
}
