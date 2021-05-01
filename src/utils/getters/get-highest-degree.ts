import { UserDegree } from '../../models/user';

const sortByDegree = (first: UserDegree, second: UserDegree): number => {
  if (first.priority > second.priority) {
    return -1;
  }

  if (first.priority < second.priority) {
    return 1;
  }

  return 0;
};

export const getHighestDegree = (degrees: UserDegree[]): UserDegree | null => {
  const sortedDegrees = degrees.sort(sortByDegree);
  if (sortedDegrees.length > 0) {
    return sortedDegrees[0];
  }
  return null;
};
