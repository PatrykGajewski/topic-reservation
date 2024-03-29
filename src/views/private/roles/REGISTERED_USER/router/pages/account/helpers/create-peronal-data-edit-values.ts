import {ContactDataFormValues, PersonalDataFormValues} from '../forms';
import { PersonalSectionData } from '../components';
import {UserDegree} from "../../../../../../../../models/user";

export const createPersonalDataEditValues = (data: PersonalSectionData): PersonalDataFormValues => ({
  firstName: data.firstName,
  lastName: data.lastName || '',
  degrees: data.degrees.map((degree: UserDegree) => degree.id),
  birthDate: data.birthDate || null,
  country: (data.address && data.address.country) || '',
  city: (data.address && data.address.city) || '',
  zip: (data.address && data.address.zip) || '',
  streetName: (data.address && data.address.streetName) || '',
  buildingNumber: (data.address && data.address.buildingNumber) || '',
  flatNumber: (data.address && data.address.flatNumber) || '',
  gender: data.gender,
});
