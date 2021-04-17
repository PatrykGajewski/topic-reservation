import { Project } from '../../../../../../../../../../models/project';

export interface Props {
  projects: Project[],
  actions: {
    handleReserveProject: (projectId: string) => void;
  },
  count: number,
  page: number,
  onChangePage: (e: any, page: number) => void,
  rowsPerPage: number,
  onChangeRowsPerPage: (e: any) => void,
}
