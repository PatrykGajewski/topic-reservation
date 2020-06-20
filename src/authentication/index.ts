import axios, { AxiosResponse } from 'axios';

import { BACKEND_API_URL } from './constants';

export interface LoginFormValues {
    email: string;
    password: string;
}

export interface VerifyUserData {
    user: LoginFormValues,
    success: () => void,
    error: () => void,
}

class Authentication {
    static isAuthenticated = false;

    static signIn = (callback: () => void) => {
      Authentication.isAuthenticated = true;
      setTimeout(callback(), 200); // some async action representation
    };

    static signOut = (callback: () => void) => {
      Authentication.isAuthenticated = false;
      setTimeout(callback(), 200); // some async action representation
    };

    static verifyUser = (props: VerifyUserData) => {
      axios.get(`${BACKEND_API_URL}/users?email=${props.user.email}&password=${props.user.password}`).then(
        (res: any) => {
          if (res.data.length) {
            Authentication.signIn(props.success);
          }
          props.error();
        },
      ).catch((err) => {
        props.error();
      });
    }
}

export default Authentication;
