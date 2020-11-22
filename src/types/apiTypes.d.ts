export type ApiErrorResponse = {
  message?: string;
  error?: string;
};

export type ApiTag = {
  id: number;
  label: string;
  count: number;
};

export class Book {
  id: number;
  title: string;
  description: string;
  year: string;
  fiction: boolean;
  textbook: boolean;
  thumbnail: string;
  favourites: number;
  reads: number;
  wishlist: number;
  rating: number;
  authors_string: string;
  tags: Tag[];
}

export type ApiMetadatum = {
  reads: number | null;
  wishlist: number | null;
  favourites: number | null;
};

export interface ApiUserMetadata {
  [key: number]: ApiMetadatum;
}
