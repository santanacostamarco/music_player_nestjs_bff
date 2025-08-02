import { SpotfyService } from '@/common/services/spotfy.service';
import { Injectable, Logger } from '@nestjs/common';

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

  constructor(private readonly spotfyService: SpotfyService) {}

  /**
   * Requests the Spotfy access token.
   * @param code - The code from Spotfy authorization.
   * @returns The Spotfy authorization response.
   * @throws {Error}
   */
  async authenticate(code: string): Promise<SpotfyApiTokenResponse> {
    const body = new URLSearchParams({
      code,
      redirect_uri: this.spotfyService.redirectUri,
      grant_type: 'authorization_code',
    });

    const response = await fetch(this.spotfyService.apiTokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + this.spotfyService.generateBasicToken(),
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
   * Builds the Spotify authorization URL with the required query parameters.
   * @returns The Spotify authorization redirect URL.
   */
  getLoginUrl(): string {
    const {
      authorizationScopes: scope,
      clientId: client_id,
      redirectUri: redirect_uri,
    } = this.spotfyService;

    const params = new URLSearchParams({
      response_type: 'code',
      client_id,
      scope,
      redirect_uri,
      state: this.spotfyService.getState(),
    });

    this.logger.log('Generated the spotfy login url.');

    return this.spotfyService.authorizePageUrl + '?' + params.toString();
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
      client_id: this.spotfyService.clientId,
    });

    const response = await fetch(this.spotfyService.apiTokenUrl, {
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
