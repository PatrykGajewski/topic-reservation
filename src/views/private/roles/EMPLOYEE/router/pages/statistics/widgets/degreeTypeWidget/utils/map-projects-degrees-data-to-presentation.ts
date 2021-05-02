import { ProjectsDegreeData } from '../../../models';
import { ProjectDegree } from '../../../../../../../../../../models/project';
import { mapProjectDegreeToText } from '../../../../../../../../../../utils/mappers';

export const mapProjectsDegreesDataToPresentation = (
  data: ProjectsDegreeData,
): any => ([
  {
    id: mapProjectDegreeToText(ProjectDegree.ASSOCIATE_DEGREE),
    label: mapProjectDegreeToText(ProjectDegree.ASSOCIATE_DEGREE),
    value: data[ProjectDegree.ASSOCIATE_DEGREE],
    color: 'hsl(138, 70%, 50%)',
  },
  {
    id: mapProjectDegreeToText(ProjectDegree.MASTER_DEGREE),
    label: mapProjectDegreeToText(ProjectDegree.MASTER_DEGREE),
    value: data[ProjectDegree.MASTER_DEGREE],
    color: 'hsl(298, 70%, 50%)',
  },
  {
    id: mapProjectDegreeToText(ProjectDegree.BACHELOR_DEGREE),
    label: mapProjectDegreeToText(ProjectDegree.BACHELOR_DEGREE),
    value: data[ProjectDegree.BACHELOR_DEGREE],
    color: 'hsl(202, 70%, 50%)',
  },
  {
    id: mapProjectDegreeToText(ProjectDegree.DOCTORAL_DEGREE),
    label: mapProjectDegreeToText(ProjectDegree.DOCTORAL_DEGREE),
    value: data[ProjectDegree.DOCTORAL_DEGREE],
    color: 'hsl(108, 70%, 50%)',
  },
]);
