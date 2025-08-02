import { Module } from '@nestjs/common';
import { AuthController } from '@/controllers/auth/auth.controller';
import { AuthService } from '@/services/auth.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
