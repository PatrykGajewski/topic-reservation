import {UserGender} from "./user-gender.model";

export interface SimplifiedUser {
  id: string,
  email: string,
  firstName: string,
  lastName: string,
  gender: UserGender,
  profilePhotoId: string,
  degrees: string[]
}
