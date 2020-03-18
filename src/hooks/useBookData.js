import { useState, useEffect } from "react";
import axios from "axios";
//import reducer, { SET_DAY, SET_INTERVIEW, SET_APPLICATION_DATA } from "reducers/application";

export default function useBookData(ssrBook) {

  const [state, setState] = useState({
    tags: ssrBook.tags,
    bookId: ssrBook.id,
    userTags: [],
    read: false,
    wishlist: false,
    fav: false,
    rating: null,
    review: {}
  });

  //API calls for user data
  useEffect(() => {
    const userTags = axios.get(`/api/books/userData?bookId=${state.bookId}`)
      .then((userTags) => {
        setState({...state, userTags})
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  //fetches an index number of a day in a week given an appointment ID
  //ie day 0 is Monday
  

  return {
    state
  };

}