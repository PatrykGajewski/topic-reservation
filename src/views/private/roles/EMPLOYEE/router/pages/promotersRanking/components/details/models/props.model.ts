import {SimplifiedUserWithOpinions} from "../../../services";
import {UserDegree} from "../../../../../../../../../../models/user";

export interface Props {
  promoter: SimplifiedUserWithOpinions
  degrees: UserDegree[]
}
