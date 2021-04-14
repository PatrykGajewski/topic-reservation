import { SelectOption } from '../../models/forms';
import { ProjectStatus } from '../../models/project';
import { mapProjectStatusToText } from './map-project-status-to-text';

export const mapProjectStatusToOptions = ():SelectOption[] => (
  Object.keys(ProjectStatus).map((key: string) => ({
    // @ts-ignore
    label: mapProjectStatusToText(ProjectStatus[key]),
    // @ts-ignore
    value: ProjectStatus[key],
  }))
);
