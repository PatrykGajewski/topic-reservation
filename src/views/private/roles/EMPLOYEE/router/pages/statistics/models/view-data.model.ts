import {ProjectTypeDataGroup} from "./project-type-data-group.model";
import {ProjectsDegreeData} from "./project-degree-data.model";

export interface ViewData {
  projectTypeData: ProjectTypeDataGroup[],
  degreeTypeData: ProjectsDegreeData
}
