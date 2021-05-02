import { UserDegree } from '../models/user';

export const degreeDescendingSort = (first: UserDegree, second: UserDegree): number => {
  if (first.priority > second.priority) {
    return -1;
  }
  if (first.priority < second.priority) {
    return 1;
  }
  return 0;
};
