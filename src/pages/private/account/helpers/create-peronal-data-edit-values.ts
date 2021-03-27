import {ContactDataFormValues, PersonalDataFormValues} from '../forms';
import { PersonalSectionData } from '../components';

export const createPersonalDataEditValues = (data: PersonalSectionData): PersonalDataFormValues => ({
  firstName: data.firstName,
  lastName: data.lastName || '',
  birthDate: data.birthDate || null,
  country: (data.address && data.address.country) || '',
  city: (data.address && data.address.city) || '',
  zip: (data.address && data.address.zip) || '',
  streetName: (data.address && data.address.streetName) || '',
  buildingNumber: (data.address && data.address.buildingNumber) || '',
  flatNumber: (data.address && data.address.flatNumber) || '',
  gender: data.gender,
});
