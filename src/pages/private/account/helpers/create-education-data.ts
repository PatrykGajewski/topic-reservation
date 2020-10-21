import { EducationSectionData } from '../components';
import { EducationStateData } from '../AccountPage';

export const createEducationData = (data: EducationStateData):EducationSectionData => ({
  finishedUniversities: data.finishedUniversities,
  currentUniversities: data.currentUniversities,
});
