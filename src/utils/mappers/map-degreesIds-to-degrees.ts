import { UserDegree } from '../../models/user';

export const mapDegreesIdsToDegrees = (degreesIds: string[], degrees: UserDegree[]): UserDegree[] => {
  const selectedDegrees: UserDegree[] = [];

  const flatDegrees: string[] = degrees.map((degree: UserDegree) => degree.id);
  degreesIds.forEach((degreeId: string) => {
    const currentDegreeIndex: number = flatDegrees.indexOf(degreeId);
    if (currentDegreeIndex !== -1) {
      selectedDegrees.push(degrees[currentDegreeIndex]);
    }
  });

  return selectedDegrees;
};
