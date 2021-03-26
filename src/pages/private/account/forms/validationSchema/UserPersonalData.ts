import * as Yup from 'yup';

export const UserPersonalDataValidation = Yup.object().shape({
  firstName: Yup.string()
    .required(),
  lastName: Yup.string()
    .required(),
  birthDate: Yup.string()
    .required(),
  country: Yup.string()
    .required(),
  city: Yup.string()
    .required(),
  zip: Yup.string()
    .required(),
  streetName: Yup.string()
    .required(),
  buildingNumber: Yup.string()
    .required(),
  flatNumber: Yup.string(),
  gender: Yup.string()
    .required(),
});
