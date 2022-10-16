import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthenticateDTO } from '@modules/user/domain/dtos/authenticate.dto';
import {
  UsersRepository,
  UsersRepositoryToken,
} from '@modules/user/domain/repositories/users.repository';

import { AuthenticateResponse } from './authenticate.types';

@Injectable()
export class AuthenticateService {
  constructor(
    @Inject(UsersRepositoryToken)
    private usersRepository: UsersRepository,
  ) {}

  async execute(data: AuthenticateDTO): Promise<AuthenticateResponse> {
    const { identification, password } = data;
    const user = await this.usersRepository.findByUsernameOrEmail(
      identification,
    );

    if (!user || password !== user.password) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const { username, email, customer, teacher } = user;

    return {
      token: 'Bearer test',
      user: {
        username,
        email,
        customer,
        teacher,
      },
    };
  }
}
