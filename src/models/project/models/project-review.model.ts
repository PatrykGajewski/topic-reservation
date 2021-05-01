import {SimplifiedUser} from "../../user";

export interface ProjectReview {
  id: string,
  reviewer: SimplifiedUser,
  createdAt: Date,
  updatedAt: Date,
  content: string,
  grade: number,
}
