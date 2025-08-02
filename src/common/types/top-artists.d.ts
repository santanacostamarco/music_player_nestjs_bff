namespace TopArtistsAndTacksInterface {
  interface Root {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
    items: Item[];
  }

  interface Item {
    external_urls: ExternalUrls;
    followers: Followers;
    genres: string[];
    href: string;
    id: string;
    images: Image[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
  }

  interface ExternalUrls {
    spotify: string;
  }

  interface Followers {
    href: string;
    total: number;
  }

  interface Image {
    url: string;
    height: number;
    width: number;
  }
}
