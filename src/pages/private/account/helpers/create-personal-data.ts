import { PersonalSectionData } from '../components';
import { PersonalStateData } from '../AccountPage';

export const createPersonalData = (data: PersonalStateData): PersonalSectionData => ({
  firstName: data.firstName,
  lastName: data.lastName || '',
  birthDate: data.birthDate ? new Date(data.birthDate).toLocaleDateString() : '',
  address: {
    country: (data.address && data.address.country) || '',
    region: (data.address && data.address.region) || '',
    city: (data.address && data.address.city) || '',
    zip: (data.address && data.address.zip) || '',
    streetName: (data.address && data.address.streetName) || '',
    buildingNumber: (data.address && data.address.buildingNumber) || '',
    flatNumber: (data.address && data.address.flatNumber) || '',
  },
  phoneNumber: data.phoneNumber || '',
  gender: data.gender,
});
