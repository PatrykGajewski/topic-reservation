import {MenuAction} from "../../../private/roles/STUDENT/router/pages/ownedProjectList/components/table/models";

export interface Props<T> {
  actions: MenuAction<T>[]
  element: T
}
