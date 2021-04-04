import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/appState';
import { UserRole } from '../../../models/user';
import { getUserMainRole } from './utils';
import { StudentRouter } from '../roles/STUDENT';
import { Props } from './models';

export const PrivatePagesRouter = (props: Props): JSX.Element => {
  const stateData = useSelector((state: AppState) => ({
    user: state.user,
  }));

  const [mainRole, setMainRole] = useState<UserRole>(getUserMainRole(stateData.user.roles));

  useEffect(() => {
    setMainRole(getUserMainRole(stateData.user.roles));
  }, [stateData.user]);

  switch (mainRole) {
  case UserRole.STUDENT:
    return (
      <StudentRouter logoutUser={props.logoutUser} {...props} />
    );
  default:
    return (<div> Cannot find suitable router</div>);
  }
};
