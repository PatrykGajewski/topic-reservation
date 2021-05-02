import {UserDegree, UserModel} from "../../../../../../../../models/user";

export interface StateData {
  user: UserModel,
  degrees: UserDegree[],
}
