import { RouteComponentProps } from 'react-router-dom';
import {LoginFormValues} from "../components/loginForm/models/login-form-values.model";

export interface Props extends RouteComponentProps {
  loginUser: (values: LoginFormValues) => Promise<any>,
}
