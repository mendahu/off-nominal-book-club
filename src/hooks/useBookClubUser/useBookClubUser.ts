import { useUser } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";
import axios from "axios";

const mailChimplistId = process.env.MAILCHIMP_AUDIENCE_ID;

export const useBookClubUser = () => {
  const { user, error, isLoading } = useUser();
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    if (!isLoading) {
      axios
        .get("/api/users/me")
        .then((response) => {
          setUserProfile(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [isLoading]);

  return {
    user: userProfile,
    loading,
  };
};
