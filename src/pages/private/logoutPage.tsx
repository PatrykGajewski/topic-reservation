import React, { useLayoutEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Authentication from '../../authentication';

const LogoutPage = () => {
  // NOTE that function will be fired before web-browser repaint view
  useLayoutEffect(() => {
    if (Authentication.isAuthenticated) {
      Authentication.signOut();
    }
  }, []);

  return <Redirect to="/login" />;
};

export { LogoutPage };
