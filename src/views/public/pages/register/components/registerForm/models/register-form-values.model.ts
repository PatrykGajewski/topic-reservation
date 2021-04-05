import {UserGender} from "../../../../../../../models/user";

export interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  gender: UserGender
}
