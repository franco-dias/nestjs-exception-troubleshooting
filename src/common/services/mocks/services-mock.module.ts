import { Module } from '@nestjs/common';

import { EncryptionServiceMock } from './encryption.service';
import { TokenServiceMock } from './token.service';
import { TranslationServiceMock } from './translation.service';

import { EncryptionServiceToken } from '../encription-service';
import { TokenServiceToken } from '../token-service';
import { TranslationServiceToken } from '../translation-service';

const TranslationService = {
  useClass: TranslationServiceMock,
  provide: TranslationServiceToken,
};

const EncryptionService = {
  useClass: EncryptionServiceMock,
  provide: EncryptionServiceToken,
};

const TokenService = {
  useClass: TokenServiceMock,
  provide: TokenServiceToken,
};

@Module({
  providers: [TranslationService, EncryptionService, TokenService],
  exports: [TranslationService, EncryptionService, TokenService],
})
export class MockServicesModule {}
