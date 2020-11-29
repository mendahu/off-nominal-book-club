import profileFormatter from './patreon/profileFormatter';
import userDataFormatter from './userDataFormatter';
import { getAuth0User } from './auth0/auth0User';
import patreonProfileFetcher from './patreon/profileFetcher';
import getAuth0UserSub from './auth0/auth0Sub';
import userQueries from '../../db/queries/users';
import { DisplayUser, PatreonTokenData } from '../types/common';
import { AvatarSelect } from '../types/enums';
import { MailchimpSubscriberStatus } from '../types/api/apiTypes.d';
const mailchimp = require('@mailchimp/mailchimp_marketing');
var md5 = require('md5');

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER,
});

const mailChimplistId = process.env.MAILCHIMP_AUDIENCE_ID;

export default async function userProfileFetcher(req) {
  //Fetches the default userProfile from auth0, which contains the unique ID of user
  let auth0sub: string;

  try {
    auth0sub = await getAuth0UserSub(req);
  } catch (error) {
    console.error('Error at UserProfileFetcher:Fetching auth0Sub', error);
    throw error;
  }

  //if no user, short circuit here
  if (!auth0sub) return null;

  //Fetches Full User Profile from auth0, extracts Patreon Token, and formats for display to client
  let isPatron: boolean;
  let patreonToken: PatreonTokenData | string;
  let userData: DisplayUser;

  try {
    const auth0User = await getAuth0User(auth0sub);
    userData = userDataFormatter(auth0User);
    patreonToken = auth0User.app_metadata.patreon;
    isPatron = !(patreonToken === 'unchecked' || patreonToken === 'skipped');
  } catch (error) {
    console.error(
      'Error at UserProfileFetcher:Fetching full auth0 Profile',
      error
    );
    throw error;
  }

  // Fetch Mailchimp Status
  let marketingStatus: MailchimpSubscriberStatus;

  try {
    const response = await mailchimp.lists.getListMember(
      mailChimplistId,
      userData.email
    );
    marketingStatus = response.status;
  } catch (err) {
    if (err.status === 404) {
      marketingStatus = MailchimpSubscriberStatus.notSubscribed;
    } else {
      console.error('Error fetching Mailchimp status\n', err);
      marketingStatus = MailchimpSubscriberStatus.unknown;
    }
  }

  //Fetches Patreon Data with token, adds to formatted client-side data
  let patreonData;
  let patreonAvatar: string;
  let patreonSuccess: boolean = false;

  try {
    if (isPatron) {
      patreonData = await patreonProfileFetcher(auth0sub, patreonToken);
      const campaignData = profileFormatter(patreonData);
      userData.patreon.campaigns = campaignData.campaigns;
      patreonAvatar = campaignData.image_url;
      patreonSuccess = true;
    }
  } catch (error) {
    console.error(
      'Error at UserProfileFetcher:Fetching Patreon Profile',
      error
    );
  }

  //Fetches onbc data
  try {
    const {
      name,
      bio,
      gravatar_avatar_url,
      patreon_avatar_url,
      avatar_select,
      favourites,
      reads,
      wishlist,
      ratings,
    } = await userQueries.users.getUserData(userData.onbc_id);

    //check for mismatch in avatars and correct in db
    if (
      gravatar_avatar_url !== userData.avatar ||
      (patreon_avatar_url !== patreonAvatar && patreonSuccess === true)
    ) {
      await userQueries.users.update(userData.onbc_id, {
        gravatar_avatar_url: userData.avatar,
        patreon_avatar_url: patreonAvatar,
      });
    }

    userData = {
      ...userData,
      name,
      bio,
      favourites,
      reads,
      wishlist,
      ratings,
      marketingStatus,
    };

    if (avatar_select === AvatarSelect.Patreon) {
      userData.avatar = patreonAvatar;
    }
  } catch (error) {
    console.error('Error at UserProfileFetcher: Fetching ONBC data', error);
  }

  return userData;
}
