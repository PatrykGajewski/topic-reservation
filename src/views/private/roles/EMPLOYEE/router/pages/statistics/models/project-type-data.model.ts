import { ProjectType } from '../../../../../../../../models/project';

export interface ProjectTypeData {
  [ProjectType.OVERVIEW_WORK]: number,
  [ProjectType.TECHNOLOGICAL_WORK]: number,
  [ProjectType.CONSTRUCTION_WORK]: number,
  [ProjectType.RESEARCH_WORK]: number,
}
