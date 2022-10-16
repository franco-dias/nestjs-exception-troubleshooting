import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

import { MockRepositoriesModule } from '@modules/user/domain/repositories/mocks/repositories-mock.module';
import { userTestData } from '@modules/user/domain/repositories/mocks/test-data/users';

import { AuthenticateController } from '../authenticate.controller';
import { AuthenticateService } from '../authenticate.service';

describe('ListUsers controller', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [MockRepositoriesModule],
      providers: [AuthenticateService],
      controllers: [AuthenticateController],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('@POST /authenticate should return token and user information', async () => {
    const { baseUser } = userTestData;
    const { username, email } = baseUser;
    return request(app.getHttpServer())
      .post('/authenticate')
      .send({ identification: 'john.doe', password: '12345678' })
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
