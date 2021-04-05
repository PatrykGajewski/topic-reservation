import {UserRole} from '../../../../models/user';


export const getUserMainRole = (userRoles: UserRole[]): UserRole => {
  if (userRoles.includes(UserRole.EMPLOYEE)) {
    return UserRole.EMPLOYEE;
  }
  if (userRoles.includes(UserRole.STUDENT)) {
    return UserRole.STUDENT;
  }
  return UserRole.REGISTERED_USER;
};
