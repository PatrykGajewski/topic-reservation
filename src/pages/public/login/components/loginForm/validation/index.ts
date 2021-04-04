import * as Yup from "yup";

export const LoginFormFieldsLength = {
  login: {
    max: 100,
    min: 6,
  },
  password: {
    max: 30,
    min: 8,
  },
};

export const LoginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter correct email address')
    .required('Email is required'),
  password: Yup.string()
    .min(
      LoginFormFieldsLength.password.min,
      `Password has at least ${LoginFormFieldsLength.password.min} characters`,
    )
    .max(
      LoginFormFieldsLength.password.max,
      `Password is limited to ${LoginFormFieldsLength.password.max} characters`,
    )
    .required('Password is required'),
});
