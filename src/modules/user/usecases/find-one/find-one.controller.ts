import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { FindOneService } from './find-one.service';

@ApiTags('Users')
@Controller('/users')
export class FindOneController {
  constructor(private findOneService: FindOneService) {}

  @Get('/:id')
  findUserById(@Param('id', ParseUUIDPipe) uuid: string) {
    return this.findOneService.execute(uuid);
  }
}
