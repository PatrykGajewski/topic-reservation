import { PersonalSectionData } from '../components';
import { UserModel } from '../../../../models/user';

export const createPersonalData = (user: UserModel): PersonalSectionData => ({
  firstName: user.firstName,
  lastName: user.lastName || '',
  birthDate: user.birthDate ? new Date(user.birthDate) : null,
  address: {
    country: (user.address && user.address.country) || '',
    city: (user.address && user.address.city) || '',
    zip: (user.address && user.address.zip) || '',
    streetName: (user.address && user.address.streetName) || '',
    buildingNumber: (user.address && user.address.buildingNumber) || '',
    flatNumber: (user.address && user.address.flatNumber) || '',
  },
  gender: user.gender,
});
