import {Route} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import React, {useState} from 'react';
import {PublicPagesRouter} from './views/public';
import {APISecured} from './API';
import {UpdateUserData} from './store/actions';
import {UserModel} from "./models/user";
import {LoginFormValues} from "./views/public/router/pages/login/components/loginForm/models/login-form-values.model";
import {PrivatePagesRouter} from "./views/private/router";
import {PageContainer} from "./views/components/styles/PageContainer";

export const MainRouter = () => {
  const dispatch = useDispatch();
  const [userHasAuthentication, setUserHasAuthentication] = useState<boolean>(false);

  const loginUser = (values: LoginFormValues): Promise<any> => (
    APISecured.post('/auth/login', values)
      .then((response) => {
        dispatch({ ...new UpdateUserData(response.data.data as UserModel) });
        setUserHasAuthentication(true);
        return Promise.resolve();
      })
      .catch((error) => {
        console.error(error);
        return Promise.reject(new Error('Incorrect login or password'));
      })
  );

  const logoutUser = () => {
    setUserHasAuthentication(false);
  };

  return (
    <PageContainer>
      {userHasAuthentication ? (
        <Route path="/" render={(props) => <PrivatePagesRouter logoutUser={logoutUser} {...props} />} />
      ) : (
        <Route path="/" render={(props) => <PublicPagesRouter loginUser={loginUser} {...props} />} />
      )}
    </PageContainer>
  );
};
