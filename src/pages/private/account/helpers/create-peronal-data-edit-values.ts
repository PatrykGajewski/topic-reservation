import { countryOptions, PersonalSectionValues } from '../forms';
import { PersonalStateData } from '../AccountPage';

export const createPersonalDataEditValues = (data: PersonalStateData): PersonalSectionValues => ({
  firstName: data.firstName,
  lastName: data.lastName || '',
  birthDate: data.birthDate || '',
  // TODO change that in the future
  country: countryOptions[0].value,
  city: (data.address && data.address.region) || '',
  zip: (data.address && data.address.zip) || '',
  streetName: (data.address && data.address.streetName) || '',
  buildingNumber: (data.address && data.address.buildingNumber) || '',
  flatNumber: (data.address && data.address.flatNumber) || '',
  gender: data.gender,
});
