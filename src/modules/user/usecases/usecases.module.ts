import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ServicesModule } from 'src/infrastructure/services/services.module';

import { AuthenticateController } from './authenticate/authenticate.controller';
import { AuthenticateService } from './authenticate/authenticate.service';
import { CreateUserController } from './create-user/create-user.controller';
import { CreateUserService } from './create-user/create-user.service';
import { FindOneController } from './find-one/find-one.controller';
import { FindOneService } from './find-one/find-one.service';
import { ListUsersController } from './list/list.controller';
import { ListUsersService } from './list/list.service';

import { RepositoriesModule } from '../infrastructure/orm/repositories/repositories.module';

@Module({
  imports: [RepositoriesModule, ServicesModule],
  controllers: [
    FindOneController,
    ListUsersController,
    CreateUserController,
    AuthenticateController,
  ],
  providers: [
    JwtService,
    FindOneService,
    ListUsersService,
    CreateUserService,
    AuthenticateService,
  ],
})
export class UseCasesModule {}
