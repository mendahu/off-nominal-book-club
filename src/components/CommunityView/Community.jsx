// import BookListItem from "../CommunityView/BookListItem";
// import BookList from "../CommunityView/BookList";
import knex from "../../../db/knex";

const Community = function({ books }) {
  return <div>hello</div>;
};

export async function getServerSideProps(context) {
  // Axios.get("/books").then(res => console.log(res));
  // const books = res.data;
  // console.log(res);
  const books = await knex.select("id").from("books");

  return { props: { books } };
}

export default Community;
