import { ArtistController } from '@/controllers/artist/artist.controller';
import { ArtistService } from '@/services/artist.service';
import { SpotfyService } from '@/common/services/spotfy.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [ArtistController],
  providers: [SpotfyService, ArtistService],
})
export class ArtistModule {}
