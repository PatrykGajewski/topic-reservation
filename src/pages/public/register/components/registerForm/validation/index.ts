import * as Yup from "yup";

const FieldsLength = {
  firstName: {
    max: 30,
    min: 2,
  },
  lastName: {
    max: 30,
    min: 2,
  },
  password: {
    max: 30,
    min: 8,
  },
};

export const RegisterValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(FieldsLength.firstName.min, `Please enter at least ${FieldsLength.firstName.min} characters`)
    .max(FieldsLength.firstName.max, `Field is limited to ${FieldsLength.firstName.max}`)
    .required('First Name is required'),
  lastName: Yup.string()
    .min(FieldsLength.lastName.min, `Please enter at least ${FieldsLength.lastName.min} characters`)
    .max(FieldsLength.lastName.max, `Field is limited to ${FieldsLength.lastName.max}`)
    .required('Last Name is required'),
  email: Yup.string()
    .email('Please enter correct email address')
    .required('Email is required field'),
  password: Yup.string()
    .min(FieldsLength.password.min, `Please enter at least ${FieldsLength.password.min} characters`)
    .max(FieldsLength.password.max, `Password is limited to ${FieldsLength.password.max} characters`)
    .required('Password is required field'),
  passwordConfirmation: Yup.string()
    .min(FieldsLength.password.min, `Please enter at least ${FieldsLength.password.min} characters`)
    .max(FieldsLength.password.max, `Password is limited to ${FieldsLength.password.max} characters`)
    .test(
      'passwords equality test',
      'Entered passwords are not equal',
      function (password) {
        return password === this.parent.password;
      },
    )
    .required('Password is required field'),
});
