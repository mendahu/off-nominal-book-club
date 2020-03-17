// import BookListItem from "../CommunityView/BookListItem";
<<<<<<< HEAD
import BookList from "../CommunityView/BookList";
const knex = require("../../../db/knex");
import axios from "axios";

function Community({ books }) {
  return <BookList books={books} />;
}
=======
// import BookList from "../CommunityView/BookList";
const knex = require('../../../db/knex');

const Community = ({ data }) => {
  return <div>hello</div>;
};
>>>>>>> feature/login

export async function getServerSideProps() {
  // Axios.get("/books").then(res => console.log(res));
  // const books = res.data;
  // console.log(res);
<<<<<<< HEAD

  const data = await knex
    .select(
      "id",
      "title",
      "fiction",
      "year",
      "description",
      "image_url",
      "isbn13",
      "google_id"
    )
    .from("books");
  // const data = await axios.get("/books");
  books = data[0];
  // console.log(books);
  return { props: { books } };
=======
  const data = await knex.select().from('books');

  return { props: { data } };
>>>>>>> feature/login
}

export default Community;

// import BookListItem from "../CommunityView/BookListItem";
// import BookList from "../CommunityView/BookList";
// import axios from "axios";
// import React, { useState, useEffect } from "react";

// export default function Community() {
//   const [books, setBooks] = useState([]);

//   useEffect(() => {
//     axios.get("/api/books").then(res => setBooks(res.data));
//   }, []);

//   return (
//     <section>
//       <BookList books={books} />
//     </section>
//   );
// }
