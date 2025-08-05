import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@/modules/auth.module';
import { UserModule } from '@/modules/user.module';
import { ArtistModule } from './modules/artist.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    ArtistModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
