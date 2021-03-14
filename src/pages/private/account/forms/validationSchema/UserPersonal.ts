import * as Yup from 'yup';

const UserPersonalValidation = Yup.object().shape({
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

// eslint-disable-next-line import/prefer-default-export
export { UserPersonalValidation };
