import { CreateUserDTO } from '@modules/user/domain/dtos/create-user.dto';

const apiBody = {
  type: CreateUserDTO,
  examples: {
    a: {
      summary: 'User information',
      value: {
        username: 'john.doe',
        email: 'john.doe@gmail.com',
        password: '12345678',
        role: 'TEACHER',
      },
    },
  },
};

export { apiBody };
