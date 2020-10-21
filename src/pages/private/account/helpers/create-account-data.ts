import { AccountSectionData } from '../components';
import { AccountStateData } from '../AccountPage';

export const createAccountData = (data: AccountStateData): AccountSectionData => ({
  email: data.email,
  creationDate: data.creationDate ? new Date(data.creationDate).toLocaleDateString() : '',
  userRoles: data.roles,
});
