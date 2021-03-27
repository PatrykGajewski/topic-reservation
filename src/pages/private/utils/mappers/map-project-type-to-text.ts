import {ProjectType} from "../../../../models/project";

export const mapProjectTypeToText = (projectType: ProjectType): string => {
  switch (projectType) {
    case ProjectType.CONSTRUCTION_WORK:
      return 'Praca konstrukcyjna';
    case ProjectType.OVERVIEW_WORK:
      return 'Praca analityczna';
    case ProjectType.RESEARCH_WORK:
      return 'Praca badawcza';
    case ProjectType.TECHNOLOGICAL_WORK:
      return 'Praca techniczna';
    default:
      return '';
  }
};
