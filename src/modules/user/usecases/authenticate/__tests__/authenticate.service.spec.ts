import { UnauthorizedException } from '@nestjs/common';

import { createTestingModule } from '@common/test-utils/test-module';
import { userTestData } from '@modules/user/domain/repositories/mocks/test-data/users';

import { AuthenticateService } from '../authenticate.service';

describe('authenticate service', () => {
  let authenticateService: AuthenticateService;
  beforeEach(async () => {
    const module = await createTestingModule({
      providers: [AuthenticateService],
    });
    authenticateService = module.get<AuthenticateService>(AuthenticateService);
  });

  it('should be able to sign in via email', async () => {
    const {
      list: [user],
    } = userTestData;
    const { email, password } = user;
    const response = await authenticateService.execute({
      identification: email,
      password,
    });
    expect(response.token).toBeDefined();
    expect(response.user.email).toBe(email);
  });

  it('should be able to sign in via username', async () => {
    const {
      list: [user],
    } = userTestData;
    const { username, password } = user;
    const response = await authenticateService.execute({
      identification: username,
      password,
    });
    expect(response.token).toBeDefined();
    expect(response.user.username).toBe(username);
  });

  it('should throw error on invalid credentials', async () => {
    expect(async () => {
      await authenticateService.execute({
        identification: 'dummy.username',
        password: '12345678',
      });
    }).rejects.toEqual(new UnauthorizedException('Invalid credentials.'));
  });
});
