import { PromoterOpinionFormValues } from './form-values.model';
import {MutableRefObject} from "react";
import {Project} from "../../../../../../../../../../models/project";
import {UserDegree} from "../../../../../../../../../../models/user";

export interface Props {
  initialValues: PromoterOpinionFormValues,
  onSubmit: (values: PromoterOpinionFormValues) => void,
  project: Project,
  submitBtnRef: MutableRefObject<HTMLButtonElement | null>,
  degrees: UserDegree[],
}
