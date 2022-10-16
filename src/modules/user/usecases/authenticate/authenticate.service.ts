import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import {
  EncryptionService,
  EncryptionServiceToken,
} from '@common/services/encription-service';
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
    @Inject(EncryptionServiceToken)
    private encryptionService: EncryptionService,
  ) {}

  async execute(data: AuthenticateDTO): Promise<AuthenticateResponse> {
    const { identification, password } = data;
    const user = await this.usersRepository.findByUsernameOrEmail(
      identification,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const isPasswordCorrect = this.encryptionService.compare(
      password,
      user.password,
    );

    if (!isPasswordCorrect) {
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
