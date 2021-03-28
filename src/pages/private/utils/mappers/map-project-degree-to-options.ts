import { SelectOption } from '../../../../models/forms';
import { ProjectDegree } from '../../../../models/project';
import { mapProjectDegreeToText } from './map-project-degree-to-text';

export const mapProjectDegreeToOptions = ():SelectOption[] => (
  Object.keys(ProjectDegree).map((key: string) => ({
    // @ts-ignore
    label: mapProjectDegreeToText(ProjectDegree[key]),
    // @ts-ignore
    value: ProjectDegree[key],
  }))
);
