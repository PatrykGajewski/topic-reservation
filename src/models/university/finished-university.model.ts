import {CurrentUniversity} from "./current-university.model";
import {UniversityDegree} from "./university-degree.model";

export interface FinishedUniversity extends CurrentUniversity {
  endDate: string,
  academicTitle: UniversityDegree
}
