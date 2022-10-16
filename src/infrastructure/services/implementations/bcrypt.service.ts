import { Injectable } from '@nestjs/common';
import { hashSync, compareSync } from 'bcryptjs';

import { EncryptionService } from '@common/services/encription-service';

@Injectable()
export class BcryptService implements EncryptionService {
  encrypt(text: string): string {
    return hashSync(text);
  }

  compare(text: string, hashed: string): boolean {
    return compareSync(text, hashed);
  }
}
