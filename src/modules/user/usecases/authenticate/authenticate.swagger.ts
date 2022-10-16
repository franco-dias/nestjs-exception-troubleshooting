import { AuthenticateDTO } from '@modules/user/domain/dtos/authenticate.dto';

const apiBody = {
  type: AuthenticateDTO,
  examples: {
    a: {
      summary: 'Authenticate via email',
      value: {
        identification: 'john.doe@gmail.com',
        password: '12345678',
      },
    },
    b: {
      summary: 'Authenticate via username',
      value: {
        identification: 'john.doe',
        password: '12345678',
      },
    },
  },
};

export { apiBody };
