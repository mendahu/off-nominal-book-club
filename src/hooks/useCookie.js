import { useState } from "react";
import { parseCookies, setCookie, destroyCookie } from 'nookies'

export default function useCookie() {
  const cookies = parseCookies()
  const defaultUserId = cookies.userId || null

  const [ userId, setUserId ] = useState(defaultUserId)

  const logUserIn = (id) => {
    setCookie(null, 'userId', id, { maxAge: 24 * 60 * 60, path: "/" })
    setUserId(id);
  }

  const logUserOut = () => {
    destroyCookie({}, 'userId', { path: "/"});
    setUserId(null);
  }

  return {
    userId,
    logUserIn,
    logUserOut
  };

}