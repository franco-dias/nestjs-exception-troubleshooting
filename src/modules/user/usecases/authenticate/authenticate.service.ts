import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

import { jwtConfig } from '@common/jwt/constants';
import {
  EncryptionService,
  EncryptionServiceToken,
} from '@common/services/encription-service';
import {
  TranslationService,
  TranslationServiceToken,
} from '@common/services/translation-service';
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
    @Inject(TranslationServiceToken)
    private translationService: TranslationService,
    private jwtService: JwtService,
  ) {}

  async execute(data: AuthenticateDTO): Promise<AuthenticateResponse> {
    const { identification, password } = data;
    const user = await this.usersRepository.findByUsernameOrEmail(
      identification,
    );

    if (!user) {
      throw new UnauthorizedException(
        await this.translationService.translate(
          'user.usecases.authenticate.errors.invalid_credentials',
        ),
      );
    }

    const isPasswordCorrect = this.encryptionService.compare(
      password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new UnauthorizedException(
        await this.translationService.translate(
          'user.usecases.authenticate.errors.invalid_credentials',
        ),
      );
    }

    const { username, email, customer, teacher } = user;

    const token = this.jwtService.sign(
      { username, sub: user.uuid },
      jwtConfig as JwtSignOptions,
    );

    return {
      token: `Bearer ${token}`,
      user: {
        username,
        email,
        customer,
        teacher,
      },
    };
  }
}
