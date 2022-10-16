import { Customer } from '@modules/user/domain/entities/customer.entity';
import { Teacher } from '@modules/user/domain/entities/teacher.entity';

export interface AuthenticateResponse {
  token: string;
  user: {
    email: string;
    username: string;
    teacher?: Teacher;
    customer?: Customer;
  };
}
