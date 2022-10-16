import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { createTestingModule } from '@common/test-utils/test-module';
import { userTestData } from '@modules/user/domain/repositories/mocks/test-data/users';

import { ListUsersController } from '../list.controller';
import { ListUsersService } from '../list.service';

describe('ListUsers controller', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await createTestingModule({
      providers: [ListUsersService],
      controllers: [ListUsersController],
    });

    app = module.createNestApplication();
    await app.init();
  });

  it('@GET /users should return all users', async () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect(userTestData.listResponse);
  });
});
