import { PersonalSectionData } from '../components';
import {UserDegree, UserModel} from '../../../../../../../../models/user';
import {mapDegreesIdsToDegrees} from "../../../../../../../../utils/mappers";

export const createPersonalData = (user: UserModel, degrees: UserDegree[]): PersonalSectionData => ({
  degrees: mapDegreesIdsToDegrees(user.degrees, degrees),
  firstName: user.firstName,
  lastName: user.lastName || '',
  birthDate: user.birthDate ? new Date(user.birthDate) : null,
  address: {
    country: (user.address && user.address.country) || 'PL',
    city: (user.address && user.address.city) || '',
    zip: (user.address && user.address.zip) || '',
    streetName: (user.address && user.address.streetName) || '',
    buildingNumber: (user.address && user.address.buildingNumber) || '',
    flatNumber: (user.address && user.address.flatNumber) || '',
  },
  gender: user.gender,
});
