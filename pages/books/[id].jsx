const knex = require("../../db/knex");
import BookTitleBar from "../../src/components/Bookview/BookTitleBar";
//import BookTagList from "../../src/components/Bookview/BookTagList";
import BookDesc from "../../src/components/Bookview/BookDesc";
//import BookReviewList from "../../src/components/Bookview/BookReviewList";

const Bookview = ({ book }) => {
  return (
    <>
      <BookTitleBar title={book.title} img={book.image_url} year={book.year} />
      <BookDesc desc={book.description} />
    </>
  );
};

/*
  <BookTagList />
  <BookReviewList />
*/

export async function getServerSideProps(context) {
  const queryId = context.params.id;

  // Fetch data from API
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
    .from("books")
    .where("id", queryId);
  const book = data[0];

  // Pass data to the page via props
  return { props: { book } };
}

export default Bookview;
