import { AccountSectionData } from '../components';
import { UserModel } from '../../../../models/user';

export const createAccountData = (user: UserModel): AccountSectionData => ({
  email: user.email,
  creationDate: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '',
  updateDate: user.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : '',
  userRoles: user.roles,
});
