import { UniversityAddress } from './university-address.model';
import { UniversityDepartment } from './university-department.model';

export interface University {
  id: string,
  name: string,
  fullName: string,
  headquarter: UniversityAddress,
  website: string,
  departments: UniversityDepartment[],
}
