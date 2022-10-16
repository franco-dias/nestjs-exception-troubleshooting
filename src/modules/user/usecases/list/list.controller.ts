import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@common/jwt/jwt-auth.guard';

import { ListUsersService } from './list.service';

@ApiTags('Users')
@Controller('/users')
export class ListUsersController {
  constructor(private listUsersService: ListUsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async listUsers(@Request() req) {
    console.log(req.user);
    const users = await this.listUsersService.execute();
    return users;
  }
}
