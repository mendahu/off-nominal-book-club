import { Author, BookType } from "../common";

export type ApiErrorResponse = {
  message?: string;
  error?: string;
};

export type ApiTag = {
  id: number;
  label: string;
  count: number;
};

export class ApiBook {
  id: number;
  title: string;
  description: string;
  year: string;
  type: BookType;
  google_id: string;
  favourites: number;
  reads: number;
  wishlist: number;
  rating: number;
  authors_string: string;
  tags: Tag[];
}

export type ApiConfirmBook = {
  id: number;
  description: string;
  google_id: string;
  fiction: boolean;
  title: string;
  authors: Author[];
};

export type ApiMetadatum = {
  reads: number | null;
  wishlist: number | null;
  favourites: number | null;
};

export interface ApiUserMetadata {
  [key: number]: ApiMetadatum;
}

export type ApiConfirmBookObj = {
  title: string | null;
  isbn13: string | null;
  google_id: string | null;
};

export enum MailchimpSubscriberStatus {
  notSubscribed = "not subscribed",
  subscribed = "subscribed",
  unsubscribed = "unsubscribed",
  pending = "pending",
  cleaned = "cleaned",
  unknown = "unknown",
}

export type ApiReadingMember = {
  id: string;
  name: string;
  avatar: string;
};

export type ApiReadingMilestone = {
  id: string;
  label: string;
  date: string;
};

export type ApiReadingBook = {
  id: string;
  title: string;
  google_id: string;
  authors: Author[];
};

export type ApiReadingHost = {
  id: string;
  name: string;
  avatar: string;
};

export type ApiReading = {
  id: string;
  book: ApiReadingBook;
  host: ApiReadingHost;
  members?: ApiReadingMember[];
  milestones?: ApiReadingMilestone[];
};
