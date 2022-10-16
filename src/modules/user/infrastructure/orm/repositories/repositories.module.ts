import { Module } from '@nestjs/common';

import { UsersRepositoryToken } from '@modules/user/domain/repositories/users.repository';
import { PrismaService } from 'src/infrastructure/services/implementations/prisma.service';

import { UsersRepositoryImpl } from './users.repository';

const UsersRepository = {
  useClass: UsersRepositoryImpl,
  provide: UsersRepositoryToken,
};

@Module({
  providers: [PrismaService, UsersRepository],
  exports: [UsersRepository],
})
export class RepositoriesModule {}
