import {ProjectTypeDataGroup} from "../../../models";
import {ProjectType} from "../../../../../../../../../../models/project";
import {mapProjectTypeToText} from "../../../../../../../../../../utils/mappers";

export const overviewType: string = mapProjectTypeToText(ProjectType.OVERVIEW_WORK);
export const researchType: string = mapProjectTypeToText(ProjectType.RESEARCH_WORK);
export const technologicalType: string = mapProjectTypeToText(ProjectType.TECHNOLOGICAL_WORK);
export const constructionType: string = mapProjectTypeToText(ProjectType.CONSTRUCTION_WORK);


export const mapProjectTypeDataToPresentation = (groups: ProjectTypeDataGroup[]): any[] => (
  groups.map((group: ProjectTypeDataGroup) => ({
    year: group.year,
    [researchType]: group.data[ProjectType.RESEARCH_WORK],
    [`${researchType}Color`]: 'hsl(187, 70%, 50%)',
    [technologicalType]: group.data[ProjectType.TECHNOLOGICAL_WORK],
    [`${technologicalType}Color`]: 'hsl(69, 70%, 50%)',
    [overviewType]: group.data[ProjectType.OVERVIEW_WORK],
    [`${overviewType}Color`]: 'hsl(273, 70%, 50%)',
    [constructionType]: group.data[ProjectType.CONSTRUCTION_WORK],
    [`${constructionType}Color`]: 'hsl(349, 70%, 50%)',
  }))
);
