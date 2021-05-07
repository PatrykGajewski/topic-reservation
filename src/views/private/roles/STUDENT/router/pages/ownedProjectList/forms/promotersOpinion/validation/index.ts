import * as Yup from 'yup';

export const PromoterOpinionValidation = Yup.object().shape({
  content: Yup.string()
    .required(),
  grade: Yup.string()
    .required(),
});
