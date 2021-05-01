import { UserDegree } from '../../models/user';
import { SelectOption } from '../../models/forms';

export const mapDegreesToOptions = (degrees: UserDegree[]): SelectOption[] => (
  degrees.map((degree: UserDegree): SelectOption => ({
    label: degree.pl.full,
    value: degree.id,
  }))
);
