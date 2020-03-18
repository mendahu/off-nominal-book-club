import { useState, useEffect } from "react";
import axios from "axios";

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
    axios.get(`/api/books/userData?bookId=${state.bookId}`)
      .then((results) => {
        const userTags = results.data[0].user_tags
        setState({...state, userTags })
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return {
    state
  };

}