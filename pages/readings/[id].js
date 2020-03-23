import Layout from "../../src/components/DefaultLayout"
import BookBanner from "../../src/components/Readings/BookBanner"
import UsersComments from "../../src/components/Readings/UsersComments"
import queries from "../../db/queries/readings"
import UserContext from "../../src/UserContext"
import { UseContext, useContext } from "react"

function ReadingView( {readingData, readingId} ) {
  const { userId } = useContext(UserContext)

  const usersIdArray = readingData.users.map(user => {
    return user.id;
  });

  return (
    <Layout>
      <BookBanner userId={userId} readingId={readingId} book={readingData.book} joinedUsers={usersIdArray}/>
      <UsersComments joinedUsers={usersIdArray} users={readingData.users} comments={readingData.comments} readingId={readingId} userId={userId}/>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const readingId = context.params.id
  console.log(readingId)

  const readingData = await queries.readings.fetch(readingId)
  console.log(readingData)
  return { props: {readingData, readingId} }
}
export default ReadingView;