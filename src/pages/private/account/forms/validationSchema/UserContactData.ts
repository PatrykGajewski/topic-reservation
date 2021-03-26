import * as Yup from 'yup';

export const UserContactDataValidation = Yup.object().shape({
  contactEmail: Yup.string()
    .required(),
  phoneNumber: Yup.string()
    .required(),
});
