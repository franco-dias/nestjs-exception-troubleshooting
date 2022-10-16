import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import {
  TranslationService,
  TranslationServiceToken,
} from '@common/services/translation-service';
import { Maybe } from '@common/types/maybe';
import { User } from '@modules/user/domain/entities/user.entity';
import { UsersRepositoryToken } from '@modules/user/domain/repositories/users.repository';
import { UsersRepositoryImpl } from '@modules/user/infrastructure/orm/repositories/users.repository';

@Injectable()
export class FindOneService {
  constructor(
    @Inject(UsersRepositoryToken)
    private usersRepository: UsersRepositoryImpl,
    @Inject(TranslationServiceToken)
    private translationService: TranslationService,
  ) {}

  async execute(id: string): Promise<Maybe<User>> {
    const user = await this.usersRepository.getById(id);
    if (!user) {
      throw new NotFoundException(
        await this.translationService.translate(
          'user.usecases.find_one.errors.not_found',
        ),
      );
    }
    return user;
  }
}
