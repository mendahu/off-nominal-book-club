// import BookListItem from "../CommunityView/BookListItem";
import BookList from "../src/components/CommunityView/BookList";
const knex = require("../db/knex");
import axios from "axios";

function Community({ books }) {
  return <BookList books={books} />;
}

export async function getServerSideProps() {
  const books = await knex
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

  console.log(books);
  return { props: { books } };
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
