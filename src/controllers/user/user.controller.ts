import { UserService } from '@/services/user.service';
import { Response } from 'express';
import { Controller, Res, Get, Post, Headers, Body } from '@nestjs/common';
import { HEADERS } from '@/common/enum/headers';
import { CreatePlaylistDto } from '@/common/dto/create-playlist.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('artists')
  async getArtists(
    @Headers(HEADERS.ACCESS_TOKEN) accessToken: string,
    @Res() res: Response,
  ) {
    try {
      const { artists } =
        await this.userService.getFollowingArtists(accessToken);

      res.json({
        artists,
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

  @Get('playlists')
  async getPlaylists(
    @Headers(HEADERS.ACCESS_TOKEN) accessToken: string,
    @Res() res: Response,
  ) {
    try {
      const { playlists } = await this.userService.getPlaylists(accessToken);
      res.json({
        playlists,
      });
    } catch (e) {
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

  @Get('profile')
  async getProfile(
    @Headers(HEADERS.ACCESS_TOKEN) accessToken: string,
    @Res() res: Response,
  ) {
    try {
      const profile = await this.userService.getProfile(accessToken);
      res.json({
        profile,
      });
    } catch (e: unknown) {
      res.status(500);
      if (e instanceof Error) {
        res.json({
          error: e.message,
        });
      }
      res.send(e);
    }
  }

  @Get('top-artists')
  async getTopArtists(
    @Headers(HEADERS.ACCESS_TOKEN) accessToken: string,
    @Res() res: Response,
  ) {
    try {
      const { items: artists } = await this.userService.getTop(
        'artists',
        accessToken,
      );

      res.json({
        artists,
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

  @Get('top-tracks')
  async getTopTracks(
    @Headers(HEADERS.ACCESS_TOKEN) accessToken: string,
    @Res() res: Response,
  ) {
    try {
      const { items: tracks } = await this.userService.getTop(
        'tracks',
        accessToken,
      );

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

  @Post('playlists/new')
  async newPlaylist(
    @Body() body: CreatePlaylistDto,
    @Headers(HEADERS.ACCESS_TOKEN) accessToken: string,
    @Res() res: Response,
  ) {
    try {
      const { id: playlistId } = await this.userService.createPlaylist(
        body,
        accessToken,
      );

      res.json({
        playlistId,
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
