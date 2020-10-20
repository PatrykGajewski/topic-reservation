import { PersonalSectionDataShape } from '../components';
import { UserModel } from "../../../../models/user";

export const createPersonalData = (user: UserModel): PersonalSectionDataShape => ({
  firstName:,
  lastName:,
  birthDate:,
  address:,
  phoneNumber:,
});
