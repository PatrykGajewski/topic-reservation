import {SimplifiedUser} from "../../../views/private/roles/STUDENT/services";

export interface ProjectReview {
  id: string,
  reviewer: SimplifiedUser,
  createdAt: Date,
  updatedAt: Date,
  content: string,
  grade: number,
}
