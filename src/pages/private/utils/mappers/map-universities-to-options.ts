import { University } from 'models/university';
import { SelectOption } from 'models/forms';

export const mapUniversitiesToOptions = (universities: University[]): SelectOption[] => (
  universities.map((university: University): SelectOption => ({
    label: university.namePL.full,
    value: university.id,
  }))
);
