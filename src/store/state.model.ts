import { ProjectModel, UserModel } from '../models';

export interface StateModel {
  user: UserModel,
  loading: boolean,
  success: boolean,
  error: any,
  projects: ProjectModel[],
}
