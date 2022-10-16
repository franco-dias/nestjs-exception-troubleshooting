import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { I18nService as I18nServiceBase, TranslateOptions } from 'nestjs-i18n';

import { TranslationService } from '@common/services/translation-service';

type RequestType = {
  headers: { [key: string]: string };
  query: { [key: string]: string };
};

@Injectable()
export class I18nService implements TranslationService {
  constructor(
    private readonly i18n: I18nServiceBase,
    @Inject(REQUEST) private request: RequestType,
  ) {}

  async translate(key: string, options?: TranslateOptions): Promise<string> {
    const { headers, query } = this.request;
    const translation = await this.i18n.t(key, {
      ...options,
      lang: query?.lang ?? headers?.lang,
    });
    return translation;
  }
}
