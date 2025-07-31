import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

interface SpotfyApiTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope?: string;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  private readonly clientId = process.env.SPOTFY_CLIENT_ID || '';

  private readonly clientSecret = process.env.SPOTFY_CLIENT_SECRET || '';

  private readonly redirectUri = process.env.SPOTFY_REDIRECT_URI || '';

  private generateBasicToken() {
    return Buffer.from(`${this.clientId}:${this.clientSecret}`).toString(
      'base64',
    );
  }

  getState(): string {
    return uuid();
  }

  getLoginUrl(state: string, scope: string): string {
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.clientId,
      scope,
      redirect_uri: this.redirectUri,
      state,
    });

    this.logger.log('Generated the spotfy login url');

    return `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  async authenticate(code: string): Promise<SpotfyApiTokenResponse> {
    const body = new URLSearchParams({
      code,
      redirect_uri: this.redirectUri,
      grant_type: 'authorization_code',
    });

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + this.generateBasicToken(),
      },
      body: body.toString(),
    });

    const data = (await response.json()) as SpotfyApiTokenResponse;

    this.logger.log('Authorization performed successfully');

    return data;
  }
}
