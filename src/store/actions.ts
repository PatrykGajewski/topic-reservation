import { SimplifiedUser, UserDegree, UserModel } from '../models/user';
import { Project } from '../models/project';
import { Tag } from '../models/tags'
import { ProjectsTableConfig, PromotersRankConfig } from './appState';
import { University } from '../models/university';

export enum ACTION_TYPES {
  'INITIAL_DATA_FETCHING' = 'INITIAL_DATA_FETCHING',
  'INITIAL_DATA_FETCHED' = 'INITIAL_DATA_FETCHED',
  'INITIAL_DATA_FETCHING_ERROR' = 'INITIAL_DATA_FETCHING_ERROR',

  'USER_DATA_UPDATE' = ' USER_DATA_UPDATE',
  'UPDATE_AVAILABLE_PROJECTS_TABLE_CONFIG' = 'UPDATE_AVAILABLE_PROJECTS_TABLE_CONFIG',

  'UPDATE_UNIVERSITIES_LIST' = 'UPDATE_UNIVERSITIES_LIST',
  'UPDATE_TAGS_LIST' = 'UPDATE_TAGS_LIST',
  'UPDATE_PROMOTERS_LIST' = 'UPDATE_PROMOTERS_LIST',
  'UPDATE_USER_PROJECTS_LIST' = 'UPDATE_USER_PROJECTS_LIST',

  'UPDATE_STUDENTS_LIST' = 'UPDATE_STUDENTS_LIST',
  'UPDATE_PROMOTERS_LIST_CONFIG' = 'UPDATE_PROMOTERS_LIST_CONFIG',
  'UPDATE_DEGREES_LIST' = 'UPDATE_DEGREES_LIST'
}

export type ActionTypes = InitialDataFetching
  | InitialDataFetched
  | InitialDataFetchingError
  | UpdateUniversitiesList
  | UpdateTagsList
  | UpdatePromotersList
  | UpdateUserProjectsList
  | UpdateUserData
  | UpdateAvailableProjectsTable
  | UpdateStudentsList
  | UpdatePromotersListView
  | UpdateDegreesList;

export class InitialDataFetching {
  type = ACTION_TYPES.INITIAL_DATA_FETCHING;
}

export class InitialDataFetched {
  type = ACTION_TYPES.INITIAL_DATA_FETCHED;
}

export class InitialDataFetchingError {
  type = ACTION_TYPES.INITIAL_DATA_FETCHING_ERROR;
}

export class UpdateUniversitiesList {
  type = ACTION_TYPES.UPDATE_UNIVERSITIES_LIST;

  payload: University[];

  constructor(list: University[]) {
    this.payload = list;
  }
}

export class UpdateTagsList {
  type = ACTION_TYPES.UPDATE_TAGS_LIST;

  payload: Tag[];

  constructor(list: Tag[]) {
    this.payload = list;
  }
}

export class UpdatePromotersList {
  type = ACTION_TYPES.UPDATE_PROMOTERS_LIST;

  payload: SimplifiedUser[];

  constructor(list: SimplifiedUser[]) {
    this.payload = list;
  }
}

export class UpdateUserProjectsList {
  type = ACTION_TYPES.UPDATE_USER_PROJECTS_LIST;

  payload: Project[];

  constructor(list: Project[]) {
    this.payload = list;
  }
}

export class UpdateUserData {
  type = ACTION_TYPES.USER_DATA_UPDATE;

  payload: UserModel;

  constructor(user: UserModel) {
    this.payload = user;
  }
}

export class UpdateAvailableProjectsTable {
  type = ACTION_TYPES.UPDATE_AVAILABLE_PROJECTS_TABLE_CONFIG;

  payload: ProjectsTableConfig;

  constructor(config: ProjectsTableConfig) {
    this.payload = config;
  }
}

export class UpdateStudentsList {
  type = ACTION_TYPES.UPDATE_STUDENTS_LIST;

  payload: SimplifiedUser[];

  constructor(students: SimplifiedUser[]) {
    this.payload = students;
  }
}

export class UpdatePromotersListView {
  type = ACTION_TYPES.UPDATE_PROMOTERS_LIST_CONFIG;

  payload: PromotersRankConfig;

  constructor(config: PromotersRankConfig) {
    this.payload = config;
  }
}

export class UpdateDegreesList {
  type = ACTION_TYPES.UPDATE_DEGREES_LIST;

  payload: UserDegree[];

  constructor(degrees: UserDegree[]) {
    this.payload = degrees;
  }
}
