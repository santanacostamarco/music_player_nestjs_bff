import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '@/services/auth.service';
import { RefreshTokenDto } from './refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('callback')
  async callback(
    @Query('code') code: string,
    @Query('state') state: string,
    @Res() res: Response,
  ) {
    if (!state) {
      res.status(400).json({
        error: 'state_missmatch',
      });
    }

    try {
      const { access_token, expires_in, refresh_token } =
        await this.authService.authenticate(code);

      res.json({
        access_token,
        expires_in,
        refresh_token,
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

  @Get('login')
  login(@Res() res: Response) {
    const state = this.authService.getState();
    const scope = 'user-read-private user-read-email';
    const url = this.authService.getLoginUrl(state, scope);
    res.json({
      url,
    });
  }

  @Post('refresh')
  async refresh(@Body() body: RefreshTokenDto, @Res() res: Response) {
    try {
      const { access_token, expires_in, refresh_token, error } =
        await this.authService.refresh(body.refresh_token);

      res.json({
        access_token,
        expires_in,
        refresh_token,
        error,
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
