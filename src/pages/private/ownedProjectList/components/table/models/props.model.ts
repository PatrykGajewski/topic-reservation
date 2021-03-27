import { Project } from '../../../../../../models/project';

export interface Props {
  projects: Project[],
  actions: {
    handleReserveProject: (projectId: string) => void;
  }
}
