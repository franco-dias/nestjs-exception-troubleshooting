import { createTestingModule } from '@common/test-utils/test-module';
import { userTestData } from '@modules/user/domain/repositories/mocks/test-data/users';

import { ListUsersService } from '../list.service';

describe('ListUsers service', () => {
  let listUsersService: ListUsersService;

  beforeEach(async () => {
    const module = await createTestingModule({
      providers: [ListUsersService],
    });

    listUsersService = module.get<ListUsersService>(ListUsersService);
  });

  it('should list the existing users', async () => {
    const users = await listUsersService.execute();
    expect(users).toEqual(userTestData.list);
  });
});
