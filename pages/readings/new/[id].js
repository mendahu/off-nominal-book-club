import Layout from "../../../src/components/DefaultLayout"
import NewReading from "../../../src/components/Readings/NewReadiing"
import queries from "../../../db/queries/readings"
import UserContext from "../../../src/UserContext"
import { useContext } from "react"

function NewReadingView( {bookData, bookId} ) {
  const { userId } = useContext(UserContext)

  return (
    <Layout>
      {console.log(userId)}
      <NewReading
        userId={userId}
        bookId={bookId}
        book={bookData}
      />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const bookId = context.params.id


  const data = await queries.readings.getBookData(bookId)
  const bookData = data.rows[0]
  return { props: {bookData, bookId} }
}
export default NewReadingView;