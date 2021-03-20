import { ProjectModel } from '../../../../../../models/project';

export interface Props {
  projects: ProjectModel[],
  actions: {
    handleReserveProject: (projectId: string) => void;
  }
}
