import { UserPersonalValues } from '../forms';

export const createPersonalDataEditValues = (): UserPersonalValues => ({
  firstName: string,
  lastName: string,
  birthDate: string,
  country: string,
  region: string,
  city: string,
  zip: string,
  streetName: string,
  buildingNumber: string,
  flatNumber: string,
});
