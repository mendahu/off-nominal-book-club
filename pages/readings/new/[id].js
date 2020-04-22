import Layout from "../../../src/components/DefaultLayout"
// import NewReading from "../../../src/components/Readings/NewReadiing"
// import queries from "../../../db/queries/readings"
import Message from '../../../src/components/Utility/Message'

function NewReadingView() {
  return (
    <Layout>
      <Message variant='warning' message='The readings feature is temporarily disabled.' />
    </Layout>
  );
};

// export async function getServerSideProps(context) {
//   const bookId = context.params.id

//   const data = await queries.readings.getBookData(bookId)
//   const bookData = data.rows[0]
//   return { props: {bookData, bookId} }
// }

export default NewReadingView;

/*
This feature temporarily disabled
When reenabled, render the following code

<NewReading
userId={userId}
bookId={bookId}
book={bookData}
/>

*/