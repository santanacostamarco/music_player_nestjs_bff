import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';

@Injectable()
export class SpotfyService {
  /**
   * The Spotfy accounts base url.
   * @private
   * @readonly
   */
  private readonly accountsUrl: string;

  /**
   * The Spotfy base url.
   * @readonly
   */
  readonly apiBaseUrl: string;

  /**
   * The api token url.
   * @readonly
   */
  readonly apiTokenUrl: string;

  /**
   * The spotfy authorization scopes.
   * @readonly
   * @private
   */
  private readonly _authorizationScopes = [
    'user-read-private',
    'user-read-email',
    'user-follow-read',
    'user-top-read',
  ];

  /**
   * The spotfy authorization scopes.
   * @readonly
   */
  get authorizationScopes(): string {
    return this._authorizationScopes.join(' ');
  }

  /**
   * The client id.
   * @readonly
   */
  readonly clientId: string;

  /**
   * The client secret.
   * @private
   * @readonly
   */
  private readonly clientSecret: string;

  /**
   * The Spotfy app uri to redirect after authorization.
   * @readonly
   */
  readonly redirectUri: string;

  /**
   * The Spotfy page url to grant authorization.
   * @readonly
   */
  readonly authorizePageUrl: string;

  constructor(protected readonly config: ConfigService) {
    this.accountsUrl = this.config.get<string>('SPOTFY_ACCOUNTS_URL') || '';
    this.apiBaseUrl = this.config.get<string>('SPOTFY_API_URL') || ``;
    this.apiTokenUrl = `${this.accountsUrl}/api/token`;
    this.authorizePageUrl = `${this.accountsUrl}/authorize`;
    this.clientId = this.config.get<string>('SPOTFY_CLIENT_ID') || '';
    this.clientSecret = this.config.get<string>('SPOTFY_CLIENT_SECRET') || '';
    this.redirectUri = this.config.get<string>('SPOTFY_REDIRECT_URI') || '';
  }

  /**
   * Generates the basic token for the Authorization header.
   * @returns The basic token.
   */
  generateBasicToken(): string {
    return Buffer.from(`${this.clientId}:${this.clientSecret}`).toString(
      'base64',
    );
  }

  /**
   * Generates a random string for the Spotify login state parameter to prevent CSRF attacks.
   * @returns A unique random state string.
   */
  getState(): string {
    return randomUUID();
  }
}
