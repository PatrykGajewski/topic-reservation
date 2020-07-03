import { UserModel } from '../models';

export enum ACTION_TYPES {
  'FETCH_USER_DATA' = 'FETCH_USER_DATA'
}

export type ActionTypes = FetchUserData;

export class FetchUserData {
  type = ACTION_TYPES.FETCH_USER_DATA;

  payload: UserModel;

  constructor(user: UserModel) {
    this.payload = user;
  }
}
