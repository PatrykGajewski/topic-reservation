import { SelectOption } from 'models/forms';
import { UserGender } from 'models/user';

export const genderOptions: SelectOption[] = [
  {
    label: 'Female',
    value: UserGender.FEMALE,
  },
  {
    label: 'Male',
    value: UserGender.MALE,
  },
  {
    label: 'Other',
    value: UserGender.OTHER,
  },
];
