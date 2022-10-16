import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { createTestingModule } from '@common/test-utils/test-module';
import { userTestData } from '@modules/user/domain/repositories/mocks/test-data/users';

import { CreateUserController } from '../create-user.controller';
import { CreateUserService } from '../create-user.service';

describe('ListUsers controller', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await createTestingModule({
      providers: [CreateUserService],
      controllers: [CreateUserController],
    });

    app = module.createNestApplication();
    await app.init();
  });

  it('@POST /users should create an user', async () => {
    const { username, email, password, role } = userTestData.baseUser;
    return request(app.getHttpServer())
      .post('/users')
      .send({ username, email, password, role })
      .expect(201)
      .expect(({ body }) => {
        delete body.uuid;
        expect(body).toEqual({ username, email, password });
      });
  });
});
