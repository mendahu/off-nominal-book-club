import Layout from "../../src/components/DefaultLayout"
import BookBanner from "../../src/components/Readings/BookBanner"
import UsersComments from "../../src/components/Readings/UsersComments"
import queries from "../../db/queries/readings"

function ReadingView( {readingData} ) {


  return (
    <Layout>
      <BookBanner book={readingData.book} />
      <UsersComments users={readingData.users} />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const queryId = context.params.id
  console.log(queryId)

  const readingData = await queries.readings.fetch(queryId)
  console.log(readingData)
  return { props: {readingData} }
}
export default ReadingView;