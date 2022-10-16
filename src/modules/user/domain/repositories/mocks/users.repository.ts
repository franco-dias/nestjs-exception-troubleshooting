import { v4 as uuid } from 'uuid';

import { Maybe } from '@common/types/maybe';
import { CreateUserDTO } from '@modules/user/domain/dtos/create-user.dto';
import { User } from '@modules/user/domain/entities/user.entity';
import { UsersRepository } from '@modules/user/domain/repositories/users.repository';

import { userTestData } from './test-data/users';

class MockUsersRepository implements UsersRepository {
  private users: User[] = userTestData.list;

  async list(): Promise<User[]> {
    return this.users;
  }

  async create(data: CreateUserDTO): Promise<User> {
    const { email, username, password } = data;
    const user = new User();
    Object.assign(user, { username, email, password, uuid: uuid() });
    this.users.push(user);
    return user;
  }

  async getById(uuid: string): Promise<Maybe<User>> {
    return this.users.find((user) => user.uuid === uuid);
  }

  async findByUsername(username: string): Promise<Maybe<User>> {
    return this.users.find((user) => user.username === username);
  }

  async findByEmail(email: string): Promise<Maybe<User>> {
    return this.users.find((user) => user.email === email);
  }

  async findByUsernameOrEmail(identification: string): Promise<User> {
    return this.users.find((user) =>
      [user.username, user.email].includes(identification),
    );
  }
}

export { MockUsersRepository };
