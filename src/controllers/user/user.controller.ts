import { UserService } from '@/services/user.service';
import { Response } from 'express';
import { Controller, Res, Get, Headers } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('artists')
  async getArtists(
    @Headers('Gtw-Access-Token') accessToken: string,
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
        res.json(e);
      }
    }
  }

  @Get('top-artists')
  async getTopArtists(
    @Headers('Gtw-Access-Token') accessToken: string,
    @Res() res: Response,
  ) {
    try {
      const { items: artists } = await this.userService.getUsersTop(
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
        res.json(e);
      }
    }
  }

  @Get('top-tracks')
  async getTopTracks(
    @Headers('Gtw-Access-Token') accessToken: string,
    @Res() res: Response,
  ) {
    try {
      const { items: tracks } = await this.userService.getUsersTop(
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
        res.json(e);
      }
    }
  }
}
