import { countryOptions, PersonalSectionValues } from '../forms';
import { PersonalStateData } from '../AccountPage';

export const createPersonalDataEditValues = (data: PersonalStateData): PersonalSectionValues => ({
  firstName: data.firstName,
  lastName: data.lastName || '',
  birthDate: data.birthDate || '',
  country: (data.address && data.address.country) || '',
  city: (data.address && data.address.city) || '',
  zip: (data.address && data.address.zip) || '',
  streetName: (data.address && data.address.streetName) || '',
  buildingNumber: (data.address && data.address.buildingNumber) || '',
  flatNumber: (data.address && data.address.flatNumber) || '',
  gender: data.gender,
});
