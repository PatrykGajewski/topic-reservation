import { ProjectStatus } from '../../models/project';

export const mapProjectStatusToText = (status: ProjectStatus): string => {
  switch (status) {
  case ProjectStatus.AVAILABLE:
    return 'dostępna';
  case ProjectStatus.DRAFT:
    return 'szkic';
  case ProjectStatus.FINISHED:
    return 'ukończona';
  case ProjectStatus.RESERVED:
    return 'zarezerwowana';
  default:
    return '';
  }
};
