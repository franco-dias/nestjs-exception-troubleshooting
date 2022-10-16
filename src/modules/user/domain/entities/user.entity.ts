import { Customer } from './customer.entity';
import { Teacher } from './teacher.entity';
import { VerificationToken } from './verification-token.entity';

export enum CustomerRole {
  CUSTOMER = 'CUSTOMER',
  TEACHER = 'TEACHER',
  ADMIN = 'ADMIN',
}

export enum CustomerStatus {
  AWAITING_VERIFICATION = 'AWAITING_VERIFICATION',
  VERIFIED = 'VERIFIED',
  INACTIVE = 'INACTIVE',
}

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
