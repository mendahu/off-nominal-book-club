// import BookListItem from "../CommunityView/BookListItem";
// import BookList from "../CommunityView/BookList";
const knex = require('../../../db/knex');

const Community = ({ data }) => {
  return <div>hello</div>;
};

export async function getServerSideProps(context) {
  // Axios.get("/books").then(res => console.log(res));
  // const books = res.data;
  // console.log(res);
  const data = await knex.select().from('books');

  return { props: { data } };
}

export default Community;
