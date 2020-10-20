import { UserModel } from '../models/user';
import { OwnedProject } from '../models/project';
import { University, UniversityDegree } from '../models/university';

export interface AppState {
  user: UserModel,
  loading: boolean,
  success: boolean,
  error: any,
  universities: University[],
  degrees: UniversityDegree[],
  projects: OwnedProject[],
}
