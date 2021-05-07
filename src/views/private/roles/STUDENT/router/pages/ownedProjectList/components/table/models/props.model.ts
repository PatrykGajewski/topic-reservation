import { Project } from '../../../../../../../../../../models/project';

export interface MenuAction<T> {
  id: string,
  label: string,
  action: (project: T) => void,
}

export interface Props {
  projects: Project[],
  count: number,
  page: number,
  onChangePage: (e: any, page: number) => void,
  rowsPerPage: number,
  onChangeRowsPerPage: (e: any) => void,
  rowActions: MenuAction<Project>[],
  onRowClick: (project: Project) => void,
}
