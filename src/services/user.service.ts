import { CreatePlaylistDto } from '@/common/dto/create-playlist.dto';
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

    type ResponseType = UserArtistsInterface.Root & SpotfyErrorInterface.Root;
    const { artists, error } = (await response.json()) as ResponseType;

    if (response.status >= 400) {
      const message = `Failed to fetch the following artists: ${error?.message}.`;
      this.logger.error(message);
      throw new Error(message);
    }

    this.logger.log('User following artists fetched successfully.');
    return {
      artists,
    };
  }

  async getPlaylists(accessToken: string) {
    const { apiBaseUrl } = this.spotfyService;

    const search = new URLSearchParams();
    search.append('limit', '5');
    // search.append('offset', '0')

    const response = await fetch(
      `${apiBaseUrl}/me/playlists?${search.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    type ResponseType = UserPlaylistsInterface.Root & SpotfyErrorInterface.Root;
    const { error, items: playlists } = (await response.json()) as ResponseType;

    if (response.status >= 400) {
      const message = `Failed to fetch user's playlists: ${error?.message}`;
      this.logger.error(message);
      throw new Error(message);
    }

    this.logger.log("User's playlists fetched successfully.");
    return { playlists };
  }

  async getProfile(accessToken: string) {
    const { apiBaseUrl } = this.spotfyService;

    const response = await fetch(`${apiBaseUrl}/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    type ResponseType = UserProfileInterface.Root & SpotfyErrorInterface.Root;
    const { error, ...profile } = (await response.json()) as ResponseType;

    if (response.status >= 400) {
      const message = `Failed to fetch the user profile: ${error?.message}`;
      this.logger.error(message);
      throw new Error(message);
    }

    this.logger.log('User profile fetched successfully.');
    return profile;
  }

  async getTop(type: 'artists' | 'tracks', accessToken: string) {
    const { apiBaseUrl } = this.spotfyService;

    const search = new URLSearchParams();
    search.append('limit', '5');
    // search.append('offset', '0')

    const response = await fetch(
      `${apiBaseUrl}/me/top/${type}?${search.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    type ResponseType = UserTopArtistsAndTacksInterface.Root &
      SpotfyErrorInterface.Root;
    const { items, error } = (await response.json()) as ResponseType;

    if (response.status >= 400) {
      const message = `Failed to fetch following artists: ${error?.message}.`;
      this.logger.error(message);
      throw new Error(message);
    }

    this.logger.log(`User's top ${type} fetched successfully.`);
    return {
      items,
    };
  }

  async createPlaylist(
    createPlaylistDto: CreatePlaylistDto,
    accessToken: string,
  ) {
    const { apiBaseUrl } = this.spotfyService;
    const { userId, ...body } = createPlaylistDto;

    const search = new URLSearchParams();
    search.append('limit', '5');
    // search.append('offset', '0')

    const response = await fetch(
      `${apiBaseUrl}/users/${userId}/playlists?${search.toString()}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(body),
      },
    );

    type ResponseType = CreatePlaylistResponseInterface.Root &
      SpotfyErrorInterface.Root;
    const { error, id } = (await response.json()) as ResponseType;

    if (response.status >= 400) {
      const message = `Faild to create playlist: ${error?.message}`;
      this.logger.error(message);
      throw new Error(message);
    }

    return {
      id,
    };
  }
}
