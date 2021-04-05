import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/appState';
import { UserRole } from '../../../models/user';
import { getUserMainRole } from './utils';
import { StudentUserDataWrapper } from '../roles/STUDENT';
import { Props } from './models';
import { RegisteredUserDataWrapper } from '../roles/REGISTERED_USER/dataWrapper';
import { EmployeeUserDataWrapper } from '../roles/EMPLOYEE/dataWrapper';

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
      <StudentUserDataWrapper logoutUser={props.logoutUser} {...props} />
    );
  case UserRole.REGISTERED_USER:
    return (
      <RegisteredUserDataWrapper logoutUser={props.logoutUser} {...props} />
    );
  case UserRole.EMPLOYEE:
    return (
      <EmployeeUserDataWrapper logoutUser={props.logoutUser} {...props} />
    );
  default:
    return (<div> Cannot find suitable router</div>);
  }
};
