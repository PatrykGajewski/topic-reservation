import { UserModel } from '../../../../../../../../models/user';
import { ContactDataSection } from '../components';

export const createContactData = (user: UserModel): ContactDataSection => (
  {
    contactEmail: user.contactEmail,
    phoneNumber: user.phoneNumber || '',
  }
);
