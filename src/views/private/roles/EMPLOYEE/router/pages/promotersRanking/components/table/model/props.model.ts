import { SimplifiedUserWithOpinions} from '../../../services';
import { MenuAction } from '../../../../../../../STUDENT/router/pages/ownedProjectList/components/table/models';
import {UserDegree} from "../../../../../../../../../../models/user";

export interface Props {
  promoters: SimplifiedUserWithOpinions[],
  count: number,
  page: number,
  degrees: UserDegree[],
  onChangePage: (e: any, page: number) => void,
  rowsPerPage: number,
  onChangeRowsPerPage: (a: any) => void,
  rowsActions: MenuAction<SimplifiedUserWithOpinions>[]
  onRowClick: (promoter: SimplifiedUserWithOpinions) => void,
}
