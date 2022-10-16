import { BadRequestException } from '@nestjs/common';

import { createTestingModule } from '@common/test-utils/test-module';
import { userTestData } from '@modules/user/domain/repositories/mocks/test-data/users';

import { CreateUserService } from '../create-user.service';

describe('create user service', () => {
  let createUserService: CreateUserService;

  beforeEach(async () => {
    const module = await createTestingModule({
      providers: [CreateUserService],
    });

    createUserService = module.get<CreateUserService>(CreateUserService);
  });

  it('should be able to create an user', async () => {
    const { baseUser } = userTestData;
    const user = await createUserService.execute(baseUser);
    expect(user.uuid).toBeDefined();
    expect(user.email).toEqual(baseUser.email);
  });

  it('should not be able to create an user with existing email', async () => {
    const { baseUser } = userTestData;

    expect(async () => {
      await createUserService.execute(baseUser);
    }).rejects.toEqual(
      new BadRequestException('user.usecases.create_user.errors.email_taken'),
    );
  });

  it('should not be able to create an user with existing username', async () => {
    const { baseUser } = userTestData;
    expect(async () => {
      await createUserService.execute({
        ...baseUser,
        email: 'random.different.email@domain.com',
      });
    }).rejects.toEqual(
      new BadRequestException(
        'user.usecases.create_user.errors.username_taken',
      ),
    );
  });
});
