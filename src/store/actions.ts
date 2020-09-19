import { UserModel, ProjectModel } from '../models';

export enum ACTION_TYPES {
  'USER_DATA_FETCHING' = 'USER_DATA_FETCHING',
  'USER_DATA_FETCHING_ERROR' = 'USER_DATA_FETCHING_ERROR',
  'USER_DATA_FETCHED' = 'USER_DATA_FETCHED',

  'PROJECTS_DATA_FETCHING' = 'PROJECTS_DATA_FETCHING',
  'PROJECTS_DATA_FETCHING_ERROR' = 'PROJECTS_DATA_FETCHING_ERROR',
  'PROJECTS_DATA_FETCHED' = 'PROJECTS_DATA_FETCHED'
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

export class ProjectsDataFetching {
  type = ACTION_TYPES.PROJECTS_DATA_FETCHING;
}

export class ProjectsDataFetchingError {
  type = ACTION_TYPES.PROJECTS_DATA_FETCHING_ERROR;

  payload: string;

  constructor(message: string) {
    this.payload = message;
  }
}

export class ProjectsDataFetched {
  type = ACTION_TYPES.PROJECTS_DATA_FETCHED;

  payload: ProjectModel[];

  constructor(data: ProjectModel[]) {
    this.payload = data;
  }
}
