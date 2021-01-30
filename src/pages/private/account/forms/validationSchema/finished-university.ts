import * as Yup from 'yup';

export const FinishedUniversityValidation = Yup.object().shape({
  universityId: Yup.string()
    .required(),
  departmentId: Yup.string()
    .required(),
  countryId: Yup.string()
    .required(),
  startDate: Yup.string()
    .required(),
  endDate: Yup.string()
    .required(),
  degreeId: Yup.string()
    .required(),
});
