const knex = require("../../db/knex");
const queries = require('../../db/queries/books')
import Layout from "../../src/components/DefaultLayout";
import BookTitleBar from "../../src/components/Bookview/BookTitleBar";
import BookTagList from "../../src/components/Bookview/BookTagList";
import BookDesc from "../../src/components/Bookview/BookDesc";
import useBookData from '../../src/hooks/useBookData';
//import BookReviewList from "../../src/components/Bookview/BookReviewList";


const Bookview = ({ book }) => {

  const { state } = useBookData(book);

  return (
    <Layout>
      <BookTitleBar authors={book.authors} title={book.title} img={book.image_url} year={book.year} />
      <BookTagList tags={state.tags}/>
      <BookDesc desc={book.description} />
    </Layout>
  );
};

/*
  <BookReviewList />
*/

export async function getServerSideProps(context) {
  const queryId = context.params.id;

  // Fetch data from API
  const bookData = await queries.books.fetch(queryId)
  const book = bookData[0];

  // Pass data to the page via props
  return { props: { book } };
}

export default Bookview;
