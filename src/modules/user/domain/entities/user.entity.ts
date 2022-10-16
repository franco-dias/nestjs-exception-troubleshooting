import { Customer } from './customer.entity';
import { Teacher } from './teacher.entity';
import { VerificationToken } from './verification-token.entity';

export class User {
  uuid: string;
  username: string;
  email: string;
  password: string;
  status: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  customer?: Customer;
  teacher?: Teacher;
  verificationTokens?: VerificationToken[];
}
