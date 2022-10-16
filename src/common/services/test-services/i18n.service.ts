import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

type RequestType = { headers: { [key: string]: string } };

@Injectable()
export class TranslationService {
  constructor(@Inject(REQUEST) private request: RequestType) {}

  async translate(key: string, options: any) {
    return key;
  }
}
