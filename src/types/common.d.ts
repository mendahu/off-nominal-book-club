import { MailchimpSubscriberStatus } from './api/apiTypes';

export interface BookTag {
  tag_id: number;
  tag_name: string;
  count: number;
}

export interface UserTag {
  tag_id: number;
  tag_rel_id: number;
}

export interface JoinedTag {
  tag_id: number;
  tag_name: string;
  count: number;
  tagRelId?: number;
  loading: boolean;
}

export interface UserRating {
  id: number;
  user_rating: number;
}

export enum BookType {
  fiction = 'Fiction',
  nonFiction = 'Non-Fiction',
  textbook = 'Textbook',
}

export interface UserReview {
  id: number;
  user_id: number;
  name: string;
  rating?: number;
  date: string;
  summary: string;
  user_review: string;
}

export interface UserData {
  user_tags: UserTag[];
  read: number;
  wishlist: number;
  fav: number;
  rating: UserRating[];
  review: UserReview[];
  name: string;
}

export interface Author {
  name: string;
}

export interface BookData {
  id: number;
  title: string;
  type: BookType;
  google_id: string;
  isbn13: string;
  description: string;
  year: string;
  thumbnail: string;
  reads: number;
  favouritess: number;
  wishlist: number;
  rating: number;
  ratings: number;
  authors: Author[];
  tags: BookTag[];
  reviews: UserReview[];
}

export interface PatreonTokenData {
  access_token: string;
  expires_in: number;
  token_typ: string;
  scope: string;
  refresh_token: string;
  version: string;
  expiry_date: number;
}

export interface Campaign {
  id: number;
  name: string;
  pledge: number;
  status: string;
}

export interface DisplayPatreonData {
  campaigns?: Campaign[];
  state: string;
}

export type Book = {
  id: number;
  title: string;
  image_url: string;
  author: string;
  rating?: number;
};

export interface DisplayUser {
  onbc_id: number;
  name: string;
  email: string;
  bio: string;
  avatar: string;
  patreon: DisplayPatreonData;
  favourites: Book[];
  reads: Book[];
  wishlist: Book[];
  ratings: Book[];
  isPatron: boolean;
  marketingStatus: MailchimpSubscriberStatus;
}
