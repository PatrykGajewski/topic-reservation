import { UserAddress } from './user-addres.model';
import { UniversityDegree, CurrentUniversity, FinishedUniversity } from '../university';
import { UserRole } from './user-role.model';
import {UserGender} from "./user-gender.model";

export interface UserModel {
  id: string,
  email: string,
  roles: UserRole[],
  firstName: string,
  icon: {
    link: string,
    added: boolean
  },
  gender: UserGender,
  lastName: string | null,
  birthDate: string | null,
  accountCreationDate: string,
  address: UserAddress | null,
  phoneNumber: string | null,
  finishedUniversities: FinishedUniversity[],
  currentUniversities: CurrentUniversity[],
  highestTitle: UniversityDegree,
}
