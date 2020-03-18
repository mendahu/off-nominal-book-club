import { useState } from "react";
import { parseCookies, setCookie, destroyCookie } from 'nookies'

export default function useCookie() {
  const cookies = parseCookies()

  const [ userId, setUserId ] = useState(cookies.userId)

  const logUserIn = (id) => {
    setCookie(null, 'userId', 1, { maxAge: 24 * 60 * 60, path: "/" })
    setUserId(id);
  }

  const logUserOut = () => {
    destroyCookie(null, 'userId');
    setUserId(null);
  }

  return {
    logUserIn,
    logUserOut,
    userId
  };

}