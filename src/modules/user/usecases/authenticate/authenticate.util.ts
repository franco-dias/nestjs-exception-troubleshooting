import * as Yup from 'yup';

export const authenticateSchema = Yup.object().shape({
  identification: Yup.string().required(),
  password: Yup.string().required().min(8),
});
