import { getSession } from "@auth0/nextjs-auth0";

const getAuth0USerSub = async (req, res): Promise<string> => {
  try {
    const returnedUserObj = await getSession(req, res);
    if (!returnedUserObj) return null;
    return returnedUserObj.user.sub;
  } catch (error) {
    console.error("Error at UserProfileFetcher:Fetching auth0Sub", error);
    throw error;
  }
};

export default getAuth0USerSub;
