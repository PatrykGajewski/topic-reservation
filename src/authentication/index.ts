import { API } from '../API';
import { UserModel } from '../models';

export interface LoginFormValues {
    email: string;
    password: string;
}

export interface VerifyUserData {
    user: LoginFormValues,
    success: (user: UserModel) => void,
    error: () => void,
}

const verifyUser = (email: string, password: string) => (
  API.get(`/users?email=${email}&password=${password}`)
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
      verifyUser(props.user.email, props.user.password).then(
        (res: any) => {
          if (res.data.length) {
            Authentication.signIn(() => props.success(res.data[0]));
            console.log(res);
          }
          props.error();
        },
      ).catch((err) => {
        props.error();
      });
    }
}

export default Authentication;
