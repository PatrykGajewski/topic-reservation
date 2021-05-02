import { Opinion } from '../../../../../services';
import { UserDegree } from '../../../../../../../../../../../../models/user';

export interface Props {
  opinions: Opinion[],
  degrees: UserDegree[],
}
