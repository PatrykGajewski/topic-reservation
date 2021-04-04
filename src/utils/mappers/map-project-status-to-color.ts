import { ProjectStatus } from '../../models/project';

export const mapProjectStatusToColor = (status: ProjectStatus): string => {
  switch (status) {
  case ProjectStatus.FINISHED:
    return '#08bc0852';
  case ProjectStatus.RESERVED:
    return '#ffc70054';
  default:
    return '#0783d973';
  }
};
