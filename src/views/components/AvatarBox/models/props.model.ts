import {UserGender} from "../../../../models/user";
import {AvatarBoxSize} from "./avatar-box-size.model";

export interface Props {
  avatarId: string | null,
  gender: UserGender,
  size: AvatarBoxSize
}
