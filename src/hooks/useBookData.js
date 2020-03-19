import { useState, useEffect } from "react";
import axios from "axios";


export default function useBookData(ssrBook, userId) {

  const [state, setState] = useState({
    tags: ssrBook.tags,
    bookId: ssrBook.id,
    user_tags: [],
    read: false,
    wishlist: false,
    fav: false,
    rating: null,
    review: {}
  });

  const toggleRead = () => {
    if (state.read) {
      axios.delete(`/api/reads/${state.read}`)
      .then(() => {
        setState({...state, read: false})
      })
    } else {
      axios.post(`/api/reads/new`, {
        userId,
        bookId: ssrBook.id
      })
      .then(res => {
        setState({...state, read: res[0]})
      })
    }
    
  }

  //API calls for user data
  useEffect(() => {
    if (userId) {
      axios.get(`/api/books/userData?bookId=${state.bookId}`)
        .then((results) => {
          const {user_tags, read, wishlist, fav, rating, review} = results.data[0]
          setState({...state, user_tags, read, wishlist, fav, rating, review })
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [userId, state.read]);

  return {
    state,
    toggleRead
  };

}