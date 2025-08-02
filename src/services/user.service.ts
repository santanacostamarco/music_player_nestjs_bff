import { SpotfyService } from '@/common/services/spotfy.service';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly spotfyService: SpotfyService) {}

  async getFollowingArtists(accessToken: string) {
    const { apiBaseUrl } = this.spotfyService;

    const search = new URLSearchParams();
    search.append('type', 'artist');
    search.append('limit', '5');

    const response = await fetch(
      `${apiBaseUrl}/me/following?${search.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    type ResponseType = ArtistsInterface.Root & SpotfyErrorInterface.Root;
    const { artists, error } = (await response.json()) as ResponseType;

    if (response.status >= 400) {
      this.logger.error(
        `Failed to fetch following artists: ${error?.message}.`,
      );
      throw new Error(error?.message);
    }

    return {
      artists,
    };
  }
}
