import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import {
  EncryptionService,
  EncryptionServiceToken,
} from '@common/services/encription-service';
import {
  UsersRepository,
  UsersRepositoryToken,
} from '@modules/user/domain/repositories/users.repository';

import { CreateUserDTO } from '../../domain/dtos/create-user.dto';
import { CustomerRole, User } from '../../domain/entities/user.entity';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject(UsersRepositoryToken)
    private usersRepository: UsersRepository,
    @Inject(EncryptionServiceToken)
    private encryptionService: EncryptionService,
  ) {}

  async execute(data: CreateUserDTO): Promise<User> {
    const { email, username, password, role } = data;
    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists) {
      throw new BadRequestException('Email already taken.');
    }

    const usernameExists = await this.usersRepository.findByUsername(username);
    if (usernameExists) {
      throw new BadRequestException('Username already taken.');
    }

    const hashedPassword = this.encryptionService.encrypt(password);

    const user = await this.usersRepository.create({
      email,
      username,
      password: hashedPassword,
      role: role ?? CustomerRole.ADMIN,
    });

    return user;
  }
}
