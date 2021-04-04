import {LoginFormValues} from "./login-form-values.model";

export interface LoginFormProps {
  onSubmit: (formValues: LoginFormValues) => void
}
