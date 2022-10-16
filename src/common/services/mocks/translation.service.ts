import { Injectable } from '@nestjs/common';

@Injectable()
export class TranslationServiceMock {
  async translate(key: string) {
    return key;
  }
}
