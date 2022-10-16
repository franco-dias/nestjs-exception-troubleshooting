import { v4 as uuid } from 'uuid';

import { User } from '@modules/user/domain/entities/user.entity';

const list: User[] = [
  {
    uuid: uuid(),
    username: 'john.doe',
    email: 'john.doe@gmail.com',
    password: '12345678',
    status: 'VERIFIED',
    role: 'TEACHER',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    uuid: uuid(),
    username: 'tom.doe',
    email: 'tom.doe@gmail.com',
    password: '12345678',
    status: 'VERIFIED',
    role: 'TEACHER',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const baseUser: User = {
  uuid: uuid(),
  username: 'john.doe',
  email: 'john.doe@gmail.com',
  password: 'somerandompassword',
  status: 'VERIFIED',
  role: 'TEACHER',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const userTestData = {
  list,
  baseUser,
};
