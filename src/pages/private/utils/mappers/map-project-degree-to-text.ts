import { ProjectDegree } from '../../../../models/project';

export const mapProjectDegreeToText = (degree: ProjectDegree): string => {
  switch (degree) {
  case ProjectDegree.ASSOCIATE_DEGREE:
    return 'Praca licencjacka';
  case ProjectDegree.BACHELOR_DEGREE:
    return 'Praca inżynierska';
  case ProjectDegree.DOCTORAL_DEGREE:
    return 'Praca doktorska';
  case ProjectDegree.MASTER_DEGREE:
    return 'Praca magisterska';
  default:
    return '';
  }
};
