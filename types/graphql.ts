export enum MomentStatus {
  Live = "LIVE",
  Upcoming = "UPCOMING",
  Ended = "ENDED"
}

export enum MomentType {
  Digital = "DIGITAL",
  Irl = "IRL"
}

export interface Dimensions {
  width: number;
  height: number;
}

export interface MediaAsset {
  uid: string;
  url: string;
  placeholderUrl: string;
  mimeType: string;
  dimensions: Dimensions;
}

export interface Brand {
  uid: string;
  name: string;
  slug: string;
  bio: string;
}

export interface Venue {
  address: string;
  city: string;
  country: string;
  uid: string;
  name: string;
  postalCode: string;
}

export interface Moment {
  createdAt: string;
  blurb: string;
  description: string;
  endDate: string;
  name: string;
  startDate: string;
  status: string;
  uid: string;
  updatedAt: string;
  isPrivate: boolean;
  cursor: string;
  brand: Brand;
  coverImage: MediaAsset;
  venue: Venue;
  slug: string;
  hasTicketingProvider: boolean;
  hideVenueUntilRsvp: boolean;
  externalUrl: string;
  timezone: string;
  type: string;
  hideDates: boolean;
}

export interface GetPublicMomentsByBrandResponse {
  data: {
    getPublicMomentsByBrand: Moment[];
  };
} 