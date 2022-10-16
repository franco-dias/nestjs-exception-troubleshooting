import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ListUsersService } from './list.service';

@ApiTags('Users')
@Controller('/users')
export class ListUsersController {
  constructor(private listUsersService: ListUsersService) {}

  @Get()
  async listUsers() {
    const users = await this.listUsersService.execute();
    return users;
  }
}
