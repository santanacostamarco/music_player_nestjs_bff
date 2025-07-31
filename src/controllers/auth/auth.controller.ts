import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '@/services/auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  login(@Res() res: Response) {
    const state = this.authService.getState();
    const scope = 'user-read-private user-read-email';
    const url = this.authService.getLoginUrl(state, scope);
    res.redirect(url);
  }

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
    const authData = await this.authService.authenticate(code);
    res.json({ message: 'Code received', authData });
  }
}
