import { Injectable } from '@nestjs/common';

import { EncryptionService } from '../encription-service';

@Injectable()
export class EncryptionServiceMock implements EncryptionService {
  encrypt(text: string): string {
    return text;
  }
  compare(text: string, hashed: string): boolean {
    return text === hashed;
  }
}
