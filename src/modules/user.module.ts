import { SpotfyService } from '@/common/services/spotfy.service';
import { UserController } from '@/controllers/user/user.controller';
import { UserService } from '@/services/user.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [UserController],
  providers: [SpotfyService, UserService],
})
export class UserModule {}
