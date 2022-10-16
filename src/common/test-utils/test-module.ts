import { Test } from '@nestjs/testing';

import { MockServicesModule } from '@common/services/mocks/services-mock.module';
import { MockRepositoriesModule } from '@modules/user/domain/repositories/mocks/repositories-mock.module';

export async function createTestingModule({
  imports = [],
  controllers = [],
  providers = [],
}: any) {
  const module = await Test.createTestingModule({
    imports: [MockRepositoriesModule, MockServicesModule, ...imports],
    controllers,
    providers,
  }).compile();

  return module;
}
