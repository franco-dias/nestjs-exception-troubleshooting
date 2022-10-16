import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { PayloadValidatorPipe } from '@common/pipes/payload-validator.pipe';
import { AuthenticateDTO } from '@modules/user/domain/dtos/authenticate.dto';

import { AuthenticateService } from './authenticate.service';
import { apiBody } from './authenticate.swagger';
import { authenticateSchema } from './authenticate.util';

@ApiTags('Auth')
@Controller('/authenticate')
export class AuthenticateController {
  constructor(private authenticateService: AuthenticateService) {}

  @Post('/')
  @UsePipes(new PayloadValidatorPipe(authenticateSchema))
  @ApiBody(apiBody)
  @HttpCode(200)
  async authenticate(@Body() data: AuthenticateDTO) {
    const { identification, password } = data;
    const responseData = await this.authenticateService.execute({
      identification,
      password,
    });

    return responseData;
  }
}
