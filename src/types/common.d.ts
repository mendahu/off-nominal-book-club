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

interface PatreonTokenData {}

interface Campaign {
  id: number;
  name: string;
  pledge: number;
  status: string;
}

interface DisplayPatreonData {
  campaigns: Campaign[];
  full_name: string;
  image_url: string;
}

interface UserAppMetaData {
  onbc_id: number;
}

interface Auth0UserAppMetaData extends UserAppMetaData {
  patreon: string | PatreonTokenData;
}

interface DisplayUserAppMetaData extends UserAppMetaData {
  patreon?: string | DisplayPatreonData;
}

interface Auth0ProfileBasic {
  name: string;
  nickname: string;
  picture: string;
}

interface Auth0ProfileFull extends Auth0ProfileBasic {
  app_metadata: Auth0UserAppMetaData;
}

interface DisplayUser extends Auth0ProfileBasic {
  app_metadata: DisplayUserAppMetaData;
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
  Auth0ProfileFull,
  DisplayUser,
  Campaign,
  DisplayPatreonData,
};
