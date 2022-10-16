import { User } from './user.entity';

export class Customer {
  uuid: string;
  name: string;
  userUUID: string;
  user: User;
}
