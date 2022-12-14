import { Maybe } from 'src/common/types/maybe';

import { CreateUserDTO } from '../dtos/create-user.dto';
import { User } from '../entities/user.entity';

export const UsersRepositoryToken = 'UsersRepository';

export interface UsersRepository {
  list(): Promise<User[]>;
  create(data: CreateUserDTO): Promise<User>;
  getById(uuid: string): Promise<Maybe<User>>;
  findByUsername(username: string): Promise<Maybe<User>>;
  findByEmail(email: string): Promise<Maybe<User>>;
  findByUsernameOrEmail(identification: string): Promise<Maybe<User>>;
}
