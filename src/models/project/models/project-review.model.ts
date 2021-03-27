import {SimplifiedUser} from "../../../pages/private/main/services";

export interface ProjectReview {
  id: string,
  reviewer: SimplifiedUser,
  createdAt: Date,
  updatedAt: Date,
  content: string,
  grade: number,
}
