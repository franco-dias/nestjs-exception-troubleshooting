import { v4 as uuid } from 'uuid';

const list = [
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

const listResponse = list.map((item) => ({
  ...item,
  createdAt: item.createdAt.toISOString(),
  updatedAt: item.updatedAt.toISOString(),
}));

const baseUser = {
  uuid: uuid(),
  username: 'john.toe',
  email: 'john.toe@gmail.com',
  password: 'somerandompassword',
  status: 'VERIFIED',
  role: 'TEACHER',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const userTestData = {
  list,
  listResponse,
  baseUser,
};
