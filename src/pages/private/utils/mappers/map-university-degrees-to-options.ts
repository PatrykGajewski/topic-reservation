import { UniversityDegree } from 'models/university';
import { SelectOption } from 'models/forms';

export const mapUniversityDegreesToOptions = (degress: UniversityDegree[]): SelectOption[] => (
  degress.map((degree: UniversityDegree): SelectOption => ({
    label: degree.name.full,
    value: degree.id,
  }))
);
