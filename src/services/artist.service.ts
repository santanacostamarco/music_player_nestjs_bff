import { SpotfyService } from '@/common/services/spotfy.service';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ArtistService {
  private readonly logger = new Logger(ArtistService.name);

  constructor(private readonly spotfyService: SpotfyService) {}

  async getArtist(id: string, accessToken: string) {
    const { apiBaseUrl } = this.spotfyService;

    const response = await fetch(`${apiBaseUrl}/artists/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    type ResponseType = ArtistInterface.Root & SpotfyErrorInterface.Root;
    const { error, ...artist } = (await response.json()) as ResponseType;

    if (response.status >= 400) {
      const message = `Failed to fetch the artist: ${error?.message}.`;
      this.logger.error(message);
      throw new Error(message);
    }

    this.logger.log('Artist fetched successfully.');

    return {
      artist,
    };
  }

  async getAlbums(artistId: string, accessToken: string) {
    const { apiBaseUrl } = this.spotfyService;

    const search = new URLSearchParams();
    search.append('limit', '8');
    // search.append('offset', '0')

    const response = await fetch(
      `${apiBaseUrl}/artists/${artistId}/albums?${search.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    type ResponseType = ArtistAlbumsInterface.Root & SpotfyErrorInterface.Root;
    const { error, items: albums } = (await response.json()) as ResponseType;

    if (response.status >= 400) {
      const message = `Failed to fetch the artist's albums: ${error?.message}.`;
      this.logger.error(message);
      throw new Error(message);
    }

    this.logger.log("Artist's albums fetched successfully.");

    return {
      albums,
    };
  }

  async getTopTracks(artistId: string, accessToken: string) {
    const { apiBaseUrl } = this.spotfyService;

    const response = await fetch(
      `${apiBaseUrl}/artists/${artistId}/top-tracks`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    type ResponseType = ArtistTopTracksInterface.Root &
      SpotfyErrorInterface.Root;
    const { error, tracks } = (await response.json()) as ResponseType;

    if (response.status >= 400) {
      const message = `Failed to fetch the artist's top tracks: ${error?.message}.`;
      this.logger.error(message);
      throw new Error(message);
    }

    this.logger.log("Artist's top tracks fetched successfully.");

    return {
      tracks,
    };
  }
}
