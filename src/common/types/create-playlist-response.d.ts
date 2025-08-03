namespace CreatePlaylistResponseInterface {
  interface Root {
    collaborative: boolean;
    description: string;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    name: string;
    owner: Owner;
    public: boolean;
    snapshot_id: string;
    tracks: Tracks;
    type: string;
    uri: string;
  }

  interface ExternalUrls {
    spotify: string;
  }

  interface Image {
    url: string;
    height: number;
    width: number;
  }

  interface Owner {
    external_urls: ExternalUrls2;
    href: string;
    id: string;
    type: string;
    uri: string;
    display_name: string;
  }

  interface ExternalUrls2 {
    spotify: string;
  }

  interface Tracks {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
    items: Item[];
  }

  interface Item {
    added_at: string;
    added_by: AddedBy;
    is_local: boolean;
    track: Track;
  }

  interface AddedBy {
    external_urls: ExternalUrls3;
    href: string;
    id: string;
    type: string;
    uri: string;
  }

  interface ExternalUrls3 {
    spotify: string;
  }

  interface Track {
    album: Album;
    artists: Artist2[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: ExternalIds;
    external_urls: ExternalUrls7;
    href: string;
    id: string;
    is_playable: boolean;
    linked_from: object;
    restrictions: Restrictions2;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
    is_local: boolean;
  }

  interface Album {
    album_type: string;
    total_tracks: number;
    available_markets: string[];
    external_urls: ExternalUrls4;
    href: string;
    id: string;
    images: Image2[];
    name: string;
    release_date: string;
    release_date_precision: string;
    restrictions: Restrictions;
    type: string;
    uri: string;
    artists: Artist[];
  }

  interface ExternalUrls4 {
    spotify: string;
  }

  interface Image2 {
    url: string;
    height: number;
    width: number;
  }

  interface Restrictions {
    reason: string;
  }

  interface Artist {
    external_urls: ExternalUrls5;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }

  interface ExternalUrls5 {
    spotify: string;
  }

  interface Artist2 {
    external_urls: ExternalUrls6;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }

  interface ExternalUrls6 {
    spotify: string;
  }

  interface ExternalIds {
    isrc: string;
    ean: string;
    upc: string;
  }

  interface ExternalUrls7 {
    spotify: string;
  }

  interface Restrictions2 {
    reason: string;
  }
}
