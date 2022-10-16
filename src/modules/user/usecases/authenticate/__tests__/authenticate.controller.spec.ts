import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { createTestingModule } from '@common/test-utils/test-module';
import { userTestData } from '@modules/user/domain/repositories/mocks/test-data/users';

import { AuthenticateController } from '../authenticate.controller';
import { AuthenticateService } from '../authenticate.service';

describe('ListUsers controller', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await createTestingModule({
      providers: [AuthenticateService],
      controllers: [AuthenticateController],
    });

    app = module.createNestApplication();
    await app.init();
  });

  it('@POST /authenticate should return token and user information', async () => {
    const user = userTestData.list[0];
    const { username, email, password } = user;
    return request(app.getHttpServer())
      .post('/authenticate')
      .send({ identification: username, password })
      .expect(200)
      .expect({
        token: 'Bearer test',
        user: {
          username,
          email,
        },
      });
  });
});
