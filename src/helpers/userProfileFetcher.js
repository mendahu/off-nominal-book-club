import profileFormatter from './patreon/profileFormatter'
import userDataFormatter from './userDataFormatter'
import { getAuth0User } from './auth0/auth0User';
import patreonProfileFetcher from './patreon/profileFetcher'
import auth0 from '../../lib/auth0';

export default async function userProfileFetcher(req) {

  //Fetches the default userProfile from auth0, which containers the unique ID of user
  let returnedUserObj;
  let auth0sub;

  try {
    returnedUserObj = await auth0.getSession(req)
    if (!returnedUserObj) return null;
    auth0sub = returnedUserObj.user.sub;
  }
  catch(error) {
    console.error("Error at UserProfileFetcher:Fetching auth0Sub", error)
    throw error
  }


  //Fetches Full User Profile from auth0, extracts Patreon Token, and formats for display to client
  let isPatron;
  let patreonToken;
  let userData;

  try {
    const auth0User = await getAuth0User(auth0sub)
    userData = userDataFormatter(auth0User)
    patreonToken = auth0User.app_metadata.patreon
    isPatron = !(patreonToken === "unchecked" || patreonToken === "skipped")
  }
  catch(error) {
    console.error("Error at UserProfileFetcher:Fetching full auth0 Profile", error)
    throw error
  }
  

  //Fetches Patreon Data with token, adds to formatted clien-side data
  let patreonData

  try {
    patreonData = isPatron ? await patreonProfileFetcher(auth0sub, patreonToken) : patreonToken
    userData.app_metadata.patreon = profileFormatter(patreonData);
  }
  catch(error) {
    console.error("Error at UserProfileFetcher:Fetching Patreon Profile", error)
    throw error
  }

  return userData;


}