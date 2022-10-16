import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { I18nModule, HeaderResolver, QueryResolver } from 'nestjs-i18n';

import { join } from 'path';

import { jwtConfig } from '@common/jwt/constants';
import { JwtStrategy } from '@common/jwt/jwt.strategy';

import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        { use: HeaderResolver, options: ['lang'] },
      ],
    }),
    PassportModule,
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions: { expiresIn: jwtConfig.expiresIn },
    }),
    UserModule,
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}
