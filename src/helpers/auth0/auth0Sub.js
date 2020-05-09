import auth0 from '../../../lib/auth0';

const getAuth0USerSub = async (req) => {

  try {
    const returnedUserObj = await auth0.getSession(req)
    if (!returnedUserObj) return null;
    return returnedUserObj.user.sub;
  }
  catch(error) {
    console.error("Error at UserProfileFetcher:Fetching auth0Sub", error)
    throw error
  }
}

export default getAuth0USerSub;