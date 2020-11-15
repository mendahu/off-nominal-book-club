export type Tag = {
  id: number;
  label: string;
  count: number;
};

export type Book = {
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
  tags: AutocompleteTag[];
};
