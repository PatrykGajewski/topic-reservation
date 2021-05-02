import { UserGender } from '../../models/user';

export const mapGenderToText = (gender: UserGender): string => {
  switch (gender) {
  case UserGender.FEMALE:
    return 'Kobieta';
  case UserGender.MALE:
    return 'Mężczyzna';
  case UserGender.OTHER:
    return 'Inna';
  default:
    return 'Inna';
  }
};
