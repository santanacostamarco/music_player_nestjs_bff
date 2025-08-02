import { Module } from '@nestjs/common';
import { AuthController } from '@/controllers/auth/auth.controller';
import { AuthService } from '@/services/auth.service';
import { SpotfyService } from '@/common/services/spotfy.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, SpotfyService],
})
export class AuthModule {}
