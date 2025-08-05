import { HEADERS } from '@/common/enum/headers';
import { Response } from 'express';
import { ArtistService } from '@/services/artist.service';
import { Controller, Get, Headers, Param, Res } from '@nestjs/common';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get(':id')
  async getArtist(
    @Param('id') id: string,
    @Headers(HEADERS.ACCESS_TOKEN) accessToken: string,
    @Res() res: Response,
  ) {
    try {
      const { artist } = await this.artistService.getArtist(id, accessToken);
      res.json({
        artist,
      });
    } catch (e: unknown) {
      res.status(500);
      if (e instanceof Error) {
        res.json({
          error: e.message,
        });
      } else {
        res.send(e);
      }
    }
  }

  @Get(':id/albums')
  async getAlbums(
    @Param('id') id: string,
    @Headers(HEADERS.ACCESS_TOKEN) accessToken: string,
    @Res() res: Response,
  ) {
    try {
      const { albums } = await this.artistService.getAlbums(id, accessToken);
      res.json({
        albums,
      });
    } catch (e: unknown) {
      res.status(500);
      if (e instanceof Error) {
        res.json({
          error: e.message,
        });
      } else {
        res.send(e);
      }
    }
  }

  @Get(':id/top-tracks')
  async getTopTracks(
    @Param('id') id: string,
    @Headers(HEADERS.ACCESS_TOKEN) accessToken: string,
    @Res() res: Response,
  ) {
    try {
      const { tracks } = await this.artistService.getTopTracks(id, accessToken);
      res.json({
        tracks,
      });
    } catch (e: unknown) {
      res.status(500);
      if (e instanceof Error) {
        res.json({
          error: e.message,
        });
      } else {
        res.send(e);
      }
    }
  }
}
