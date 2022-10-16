import { Module } from '@nestjs/common';

import { EncryptionServiceMock } from './encryption.service';
import { TranslationServiceMock } from './translation.service';

import { EncryptionServiceToken } from '../encription-service';
import { TranslationServiceToken } from '../translation-service';

const TranslationService = {
  useClass: TranslationServiceMock,
  provide: TranslationServiceToken,
};

const EncryptionService = {
  useClass: EncryptionServiceMock,
  provide: EncryptionServiceToken,
};

@Module({
  providers: [TranslationService, EncryptionService],
  exports: [TranslationService, EncryptionService],
})
export class MockServicesModule {}
