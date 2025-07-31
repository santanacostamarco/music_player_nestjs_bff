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
  private readonly clientId = process.env.SPOTFY_CLIENT_ID || '';

  private readonly clientSecret = process.env.SPOTFY_CLIENT_SECRET || '';

  private readonly logger = new Logger(AuthService.name);

  private readonly redirectUri = process.env.SPOTFY_REDIRECT_URI || '';

  private readonly spotfyBaseUrl = process.env.SPOTFY_BASE_URL || '';

  /**
   * Requests the Spotfy access token.
   * @param code - The code from Spotfy authorization.
   * @returns The Spotfy authorization response.
   * @throws {Error}
   */
  async authenticate(code: string): Promise<SpotfyApiTokenResponse> {
    const body = new URLSearchParams({
      code,
      redirect_uri: this.redirectUri,
      grant_type: 'authorization_code',
    });

    try {
      const response = await fetch(`${this.spotfyBaseUrl}/api/token`, {
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
    } catch (e: unknown) {
      this.logger.error('Failed to authorize', e);
      throw e;
    }
  }

  /**
   * Generates the basic token for the Authorization header.
   * @returns The basic token.
   */
  private generateBasicToken(): string {
    return Buffer.from(`${this.clientId}:${this.clientSecret}`).toString(
      'base64',
    );
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
      client_id: this.clientId,
      scope,
      redirect_uri: this.redirectUri,
      state,
    });

    this.logger.log('Generated the spotfy login url');

    return `${this.spotfyBaseUrl}/authorize?${params.toString()}`;
  }

  /**
   * Generates a random string for the Spotify login state parameter to prevent CSRF attacks.
   * @returns A unique random state string.
   */
  getState(): string {
    return uuid();
  }
}
