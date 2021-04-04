import { UniversityDepartment } from 'models/university';
import { SelectOption } from 'models/forms';

export const mapUniversityDepartmentsToOptions = (departments: UniversityDepartment[]): SelectOption[] => (
  departments.map((department: UniversityDepartment): SelectOption => ({
    label: department.name,
    value: department.id,
  }))
);
