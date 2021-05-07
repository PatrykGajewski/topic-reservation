import { Project } from '../../../../../../../../../../models/project';
import {UserDegree} from "../../../../../../../../../../models/user";

export interface Props {
  project: Project,
  degrees: UserDegree[],
}
