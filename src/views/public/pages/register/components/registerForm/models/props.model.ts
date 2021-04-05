import {RegisterFormValues} from "./register-form-values.model";

export interface Props {
  onSubmit: (values: RegisterFormValues) => void
  initialValues: RegisterFormValues,
}
