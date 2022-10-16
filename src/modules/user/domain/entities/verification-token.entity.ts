import { User } from './user.entity';

export class VerificationToken {
  uuid: string;
  content: string;
  userUUID: string;
  user: User;
}
