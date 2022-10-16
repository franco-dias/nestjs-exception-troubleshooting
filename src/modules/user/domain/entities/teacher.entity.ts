import { User } from './user.entity';

export class Teacher {
  uuid: string;
  name: string;
  userUUID: string;
  user: User;
}
