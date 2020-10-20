import { DepartmentSubject } from './university-department-subject.model';

export interface UniversityDepartment {
  id: string,
  name: string,
  website: string,
  subjects: DepartmentSubject[],
}
