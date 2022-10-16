import * as Yup from 'yup';

export const createUserSchema = Yup.object().shape({
  username: Yup.string().required(),
  email: Yup.string().required(),
  password: Yup.string().required().min(8),
  role: Yup.string().required().oneOf(['TEACHER', 'CUSTOMER']),
});
