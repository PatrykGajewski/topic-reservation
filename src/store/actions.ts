import { UserModel } from '../models/user';
import { ProjectModel } from '../models/project';
import { AvailableProjectsTableConfig } from './appState';

export enum ACTION_TYPES {
  'USER_DATA_FETCHING' = 'USER_DATA_FETCHING',
  'USER_DATA_FETCHING_ERROR' = 'USER_DATA_FETCHING_ERROR',
  'USER_DATA_FETCHED' = 'USER_DATA_FETCHED',
  'USER_DATA_UPDATE' = ' USER_DATA_UPDATE',

  'USER_PROJECTS_DATA_FETCHING' = 'USER_PROJECTS_DATA_FETCHING',
  'USER_PROJECTS_DATA_FETCHING_ERROR' = 'USER_PROJECTS_DATA_FETCHING_ERROR',
  'USER_PROJECTS_DATA_FETCHED' = 'USER_PROJECTS_DATA_FETCHED',
  'USER_PROJECTS_DATA_UPDATE' = 'USER_PROJECTS_DATA_UPDATE',
  'UPDATE_AVAILABLE_PROJECTS_TABLE_CONFIG' = 'UPDATE_AVAILABLE_PROJECTS_TABLE_CONFIG',
}

export type ActionTypes = UserDataFetched;

export class UserDataFetched {
  type = ACTION_TYPES.USER_DATA_FETCHED;

  payload: UserModel;

  constructor(user: UserModel) {
    this.payload = user;
  }
}

export class UserDataFetching {
  type = ACTION_TYPES.USER_DATA_FETCHING;
}

export class UserDataFetchingError {
  type = ACTION_TYPES.USER_DATA_FETCHING_ERROR;

  payload: string;

  constructor(message: string) {
    this.payload = message;
  }
}

export class UpdateUserData {
  type = ACTION_TYPES.USER_DATA_UPDATE;

  payload: UserModel;

  constructor(user: UserModel) {
    this.payload = user;
  }
}

export class UserProjectsDataFetching {
  type = ACTION_TYPES.USER_PROJECTS_DATA_FETCHING;
}

export class UserProjectsDataFetchingError {
  type = ACTION_TYPES.USER_PROJECTS_DATA_FETCHING_ERROR;

  payload: string;

  constructor(message: string) {
    this.payload = message;
  }
}

export class UserProjectsDataFetched {
  type = ACTION_TYPES.USER_PROJECTS_DATA_FETCHED;

  payload: ProjectModel[];

  constructor(data: ProjectModel[]) {
    this.payload = data;
  }
}

export class UpdateUserProjectsList {
  type = ACTION_TYPES.USER_PROJECTS_DATA_UPDATE;

  payload: ProjectModel[];

  constructor(data: ProjectModel[]) {
    this.payload = data;
  }
}

export class UpdateAvailableProjectsTable {
  type = ACTION_TYPES.UPDATE_AVAILABLE_PROJECTS_TABLE_CONFIG;

  payload: AvailableProjectsTableConfig;

  constructor(config: AvailableProjectsTableConfig) {
    this.payload = config;
  }
}
