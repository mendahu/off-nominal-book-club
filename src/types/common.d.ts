interface BookTag {
  tag_id: number;
  tag_name: string;
  count: number;
}

interface UserTag {
  tag_id: number;
  tag_rel_id: number;
}

interface JoinedTag {
  tag_id: number;
  tag_name: string;
  count: number;
  tagRelId?: number;
}

interface UserRating {
  id: number;
  user_rating: number;
}

interface UserReview {
  id: number;
  user_id: number;
  name: string;
  rating?: number;
  date: string;
  summary: string;
  user_review: string;
}

interface UserData {
  user_tags: UserTag[];
  read: number;
  wishlist: number;
  fav: number;
  rating: UserRating[];
  review: UserReview[];
  name: string;
}

interface Author {
  name: string;
}

interface BookData {
  id: number;
  title: string;
  fiction: boolean;
  google_id: string;
  isbn13: string;
  description: string;
  year: string;
  image_url: string;
  reads: number;
  favs: number;
  wishes: number;
  rating: number;
  authors: Author[];
  tags: BookTag[];
  reviews: UserReview[];
}

interface PatreonTokenData {
  access_token: string;
  expires_in: number;
  token_typ: string;
  scope: string;
  refresh_token: string;
  version: string;
  expiry_date: number;
}

interface Campaign {
  id: number;
  name: string;
  pledge: number;
  status: string;
}

interface DisplayPatreonData {
  campaigns?: Campaign[];
  state: string;
}

type Book = {
  id: number;
  title: string;
  image_url: string;
  author: string;
  rating?: number;
};

enum avatarSelect {
  'gravatar',
  'patreon',
}

interface DisplayUser {
  onbc_id: number;
  name: string;
  bio: string;
  gravatar_avatar_url: string;
  patreon_avatar_url: string;
  avatar_select: string;
  avatar: avatarSelect;
  patreon: DisplayPatreonData;
  favourites: Book[];
  reads: Book[];
  wishlist: Book[];
  ratings: Book[];
  isPatron: boolean;
}

export {
  BookTag,
  UserTag,
  JoinedTag,
  UserRating,
  UserReview,
  UserData,
  Author,
  BookData,
  Campaign,
  DisplayPatreonData,
  PatreonTokenData,
  avatarSelect,
  DisplayUser,
};
