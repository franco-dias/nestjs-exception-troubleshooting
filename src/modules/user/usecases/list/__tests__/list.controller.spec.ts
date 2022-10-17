import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { createTestingModule } from '@common/test-utils/test-module';
import { userTestData } from '@modules/user/domain/repositories/mocks/test-data/users';

import { AuthenticateController } from '../../authenticate/authenticate.controller';
import { AuthenticateService } from '../../authenticate/authenticate.service';
import { ListUsersController } from '../list.controller';
import { ListUsersService } from '../list.service';

describe('ListUsers controller', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await createTestingModule({
      providers: [ListUsersService, AuthenticateService],
      controllers: [ListUsersController, AuthenticateController],
    });

    app = module.createNestApplication();
    await app.init();
  });

  it('@GET /users should return all users', async () => {
    const user = userTestData.list[0];
    const { username, email, password } = user;
    await request(app.getHttpServer())
      .post('/authenticate')
      .send({ identification: username, password })
      .expect(200)
      .expect(({ body }) => {
        const { token, user } = body;
        expect(token).toBeDefined();
        expect(user).toEqual({
          username,
          email,
        });
      })
      .then((res) => {
        const { token } = res.body;
        request(app.getHttpServer())
          .get('/users')
          .set('authorization', token)
          .expect(200)
          .expect(userTestData.listResponse);
      });
  });
});
