import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

interface SpotfyApiTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope?: string;
  error?: string;
  error_description?: string;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  private readonly SPOTFY_BASE_URL = process.env.SPOTFY_BASE_URL || '';

  private readonly SPOTFY_CLIENT_ID = process.env.SPOTFY_CLIENT_ID || '';

  private readonly SPOTFY_CLIENT_SECRET =
    process.env.SPOTFY_CLIENT_SECRET || '';

  private readonly SPOTFY_REDIRECT_URI = process.env.SPOTFY_REDIRECT_URI || '';

  get SPOTFY_API_TOKEN_URL() {
    return `${this.SPOTFY_BASE_URL}/api/token`;
  }

  get SPOTFY_AUTHORIZE_PAGE_URL() {
    return `${this.SPOTFY_BASE_URL}/authorize`;
  }

  /**
   * Requests the Spotfy access token.
   * @param code - The code from Spotfy authorization.
   * @returns The Spotfy authorization response.
   * @throws {Error}
   */
  async authenticate(code: string): Promise<SpotfyApiTokenResponse> {
    const body = new URLSearchParams({
      code,
      redirect_uri: this.SPOTFY_REDIRECT_URI,
      grant_type: 'authorization_code',
    });

    const response = await fetch(this.SPOTFY_API_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + this.generateBasicToken(),
      },
      body: body.toString(),
    });

    const data = (await response.json()) as SpotfyApiTokenResponse;

    if (response.status === 400) {
      const message = `Failed to authorize: ${data.error_description}.`;
      this.logger.error(message);
      throw new Error(message);
    }

    this.logger.log('Authorization performed successfully.');
    return data;
  }

  /**
   * Generates the basic token for the Authorization header.
   * @returns The basic token.
   */
  private generateBasicToken(): string {
    return Buffer.from(
      `${this.SPOTFY_CLIENT_ID}:${this.SPOTFY_CLIENT_SECRET}`,
    ).toString('base64');
  }

  /**
   * Builds the Spotify authorization URL with the required query parameters.
   * @param state - A random string to prevent CSRF attacks.
   * @param scope - The requested access scopes.
   * @returns The Spotify authorization redirect URL.
   */
  getLoginUrl(state: string, scope: string): string {
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.SPOTFY_CLIENT_ID,
      scope,
      redirect_uri: this.SPOTFY_REDIRECT_URI,
      state,
    });

    this.logger.log('Generated the spotfy login url.');

    return this.SPOTFY_AUTHORIZE_PAGE_URL + '?' + params.toString();
  }

  /**
   * Generates a random string for the Spotify login state parameter to prevent CSRF attacks.
   * @returns A unique random state string.
   */
  getState(): string {
    return uuid();
  }

  /**
   * Refreshes the Spotfy access token.
   * @param refreshToken - The strored refresh token.
   * @returns The Spotfy authorization response.
   */
  async refresh(refreshToken: string): Promise<SpotfyApiTokenResponse> {
    const body = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: this.SPOTFY_CLIENT_ID,
    });

    const response = await fetch(this.SPOTFY_API_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    });
    const data = (await response.json()) as SpotfyApiTokenResponse;

    if (response.status === 400) {
      const message = `Failed to refresh authorization: ${data.error_description}.`;
      this.logger.error(message);
      throw new Error(message);
    }

    this.logger.log('Authorization refreshed successfully.');
    return data;
  }
}
