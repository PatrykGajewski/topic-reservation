import {Order, SimplifiedUserWithOpinions} from '../../../services';
import { MenuAction } from '../../../../../../../STUDENT/router/pages/ownedProjectList/components/table/models';

export interface Props {
  promoters: SimplifiedUserWithOpinions[],
  total: number,
  count: number,
  page: number,
  order: Order,
  onChangePage: (e: any, page: number) => void,
  rowsPerPage: number,
  onChangeRowsPerPage: (a: any) => void,
  rowsActions: MenuAction<SimplifiedUserWithOpinions>[]
}
