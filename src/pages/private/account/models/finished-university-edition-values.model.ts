import { CurrentUniversityValues } from './current-university-edition-values.model';

export interface FinishedUniversityValues extends CurrentUniversityValues {
  universityId: string,
  departmentId: string,
  startDate: string,
  endDate: string,
  degreeId: string,
}
