import { JwtService } from '@nestjs/jwt';

import { TokenService } from '../token-service';

export class TokenServiceMock implements TokenService {
  sign(): string {
    return new JwtService().sign({}, { secret: 'mock-test' });
  }
}
