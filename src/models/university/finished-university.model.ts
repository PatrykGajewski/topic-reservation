import { CurrentUniversity } from "./current-university.model";

export interface FinishedUniversity extends CurrentUniversity {
  degree: {
    id: string,
    name: {
      full: string,
      short: string,
    }
  }
  endDate: string,
}
