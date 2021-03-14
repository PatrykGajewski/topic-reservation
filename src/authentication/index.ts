import { APISecured } from '../API';
import { UserModel } from '../models/user';

export interface LoginFormValues {
    email: string;
    password: string;
}

export interface VerifyUserData {
    user: LoginFormValues,
    success: (user: UserModel) => void,
    error: () => void,
}

const authenticateUser = (email: string, password: string) => (
  APISecured.post('/auth/login', {
    email,
    password,
  })
);

class Authentication {
    static isAuthenticated = false;

    static signIn = (callback: () => void) => {
      Authentication.isAuthenticated = true;
      callback();
    };

    static signOut = () => {
      Authentication.isAuthenticated = false;
    };

    static verifyUser = (props: VerifyUserData) => {
      authenticateUser(props.user.email, props.user.password).then(
        (res: any) => {
          Authentication.signIn(() => props.success(res.data.data));
        },
      ).catch((err) => {
        props.error();
      });
    }
}

export default Authentication;
