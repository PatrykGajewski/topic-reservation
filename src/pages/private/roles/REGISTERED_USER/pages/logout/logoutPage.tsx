import React, { useLayoutEffect } from 'react';
import { Redirect } from 'react-router-dom';

interface Props {
  logoutUser: () => void
}

const LogoutPage = (props: Props) => {
  useLayoutEffect(() => {
    props.logoutUser();
  }, []);

  return <Redirect to="/" />;
};

export { LogoutPage };
