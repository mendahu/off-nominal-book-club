export type ErrorResponse = {
  message?: string;
  error?: string;
};

export type Tag = {
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
