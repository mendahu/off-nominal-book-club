import React from 'react';
import axios from 'axios';

// Use a global to save the user, so we don't have to fetch it again after page navigations
let userState;

const User = React.createContext({
  user: null,
  loading: false,
  resetUserPatreonState: () => {},
});

export const fetchUser = async () => {
  if (userState !== undefined) {
    return userState;
  }

  let userData;

  try {
    userData = await axios.get(`/api/auth0/me`);
    userState = userData.status === 200 ? userData.data : null;
  } catch (error) {
    console.error(error);
  }

  return userState;
};

export const UserProvider = ({ value, children }) => {
  const { user } = value;

  // If the user was fetched in SSR add it to userState so we don't fetch it again
  React.useEffect(() => {
    if (!userState && user) {
      userState = user;
    }
  }, []);

  return <User.Provider value={value}>{children}</User.Provider>;
};

export const useUser = () => React.useContext(User);

export const useFetchUser = () => {
  const [data, setUser] = React.useState({
    user: userState || null,
    loading: userState === undefined,
  });

  React.useEffect(() => {
    if (userState !== undefined) {
      return;
    }

    let isMounted = true;

    fetchUser().then((user) => {
      // Only set the user if the component is still mounted
      if (isMounted) {
        setUser({ user, loading: false });
      }
    });

    return () => {
      isMounted = false;
    };
  }, [userState]);

  const resetUserPatreonState = () => {
    //sets user state to match removal of Patreon for page render where user is
    setUser({
      user: { ...data.user, patreon: { state: 'skipped' }, isPatron: false },
      loading: false,
    });

    //triggers an API call on next page navigation to ensure state is correct
    userState = undefined;
  };

  const { user, loading } = data;

  return { user, loading, resetUserPatreonState };
};
