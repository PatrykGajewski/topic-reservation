import * as Yup from 'yup';

export const CurrentUniversityValidation = Yup.object().shape({
  universityId: Yup.string()
    .required(),
  departmentId: Yup.string()
    .required(),
  countryId: Yup.string()
    .required(),
  startDate: Yup.string()
    .required(),
});
