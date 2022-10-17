import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { EncryptionServiceToken } from '@common/services/encription-service';
import { TokenServiceToken } from '@common/services/token-service';
import { TranslationServiceToken } from '@common/services/translation-service';

import { BcryptService } from './implementations/bcrypt.service';
import { I18nService } from './implementations/i18n.service';
import {
  ORMServiceToken,
  PrismaService,
} from './implementations/prisma.service';

const TranslationService = {
  useClass: I18nService,
  provide: TranslationServiceToken,
};

const ORMService = {
  useClass: PrismaService,
  provide: ORMServiceToken,
};

const EncryptionService = {
  useClass: BcryptService,
  provide: EncryptionServiceToken,
};

const TokenService = {
  useClass: JwtService,
  provide: TokenServiceToken,
};

@Module({
  providers: [ORMService, TranslationService, EncryptionService, TokenService],
  exports: [TranslationService, EncryptionService, TokenService],
})
export class ServicesModule {}
