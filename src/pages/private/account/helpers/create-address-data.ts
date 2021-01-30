import { UserAddress } from 'models/user';

const emptyUserAddress: UserAddress = {
  country: '',
  region: '',
  city: '',
  zip: '',
  streetName: '',
  buildingNumber: '',
  flatNumber: '',
};

export const createAddressData = (address: UserAddress | null): UserAddress => {
  if (address) {
    return address;
  }
  return emptyUserAddress;
};
