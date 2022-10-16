import { Injectable } from '@nestjs/common';

import { Maybe } from '@common/types/maybe';
import { CreateUserDTO } from '@modules/user/domain/dtos/create-user.dto';
import { User } from '@modules/user/domain/entities/user.entity';
import { UsersRepository } from '@modules/user/domain/repositories/users.repository';
import { PrismaService } from 'src/infrastructure/services/implementations/prisma.service';

@Injectable()
class UsersRepositoryImpl implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async list(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async create(data: CreateUserDTO): Promise<User> {
    try {
      const user = await this.prisma.user.create({
        data: {
          ...data,
          status: 'PENDING_VERIFICATION',
          role: data.role ?? 'CUSTOMER',
        },
      });
      return user;
    } catch (e) {
      console.log(e);
    }
  }

  async getById(uuid: string): Promise<Maybe<User>> {
    const user = await this.prisma.user.findUnique({ where: { uuid } });
    return user;
  }

  async findByUsername(username: string): Promise<Maybe<User>> {
    const user = await this.prisma.user.findFirst({
      where: { username },
    });
    return user;
  }

  async findByEmail(email: string): Promise<Maybe<User>> {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });
    return user;
  }

  async findByUsernameOrEmail(identification: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ username: identification }, { email: identification }],
      },
    });
    return user;
  }
}

export { UsersRepositoryImpl };
