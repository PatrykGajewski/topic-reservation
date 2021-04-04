import { SelectOption } from '../../models/forms';
import { ProjectType } from '../../models/project';
import { mapProjectTypeToText } from './map-project-type-to-text';

export const mapProjectTypeToOptions = (): SelectOption[] => (
  Object.keys(ProjectType)
    .map((key: string) => ({
      // @ts-ignore
      label: mapProjectTypeToText(ProjectType[key]),
      // @ts-ignore
      value: ProjectType[key],
    }))
);
