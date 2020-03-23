import Layout from "../../src/components/DefaultLayout"
import BookBanner from "../../src/components/Readings/BookBanner"
import UsersComments from "../../src/components/Readings/UsersComments"
import queries from "../../db/queries/readings"
import UserContext from "../../src/UserContext"
import { useContext, useState, useEffect } from "react"

function ReadingView( {readingData, readingId} ) {
  const { userId } = useContext(UserContext)

  const [users, setUsers] = useState(readingData.users)

  const [usersIdArray, setUsersIdArray] = useState(readingData.users.map(user => {
    return user.id;
  }))

  return (
    <Layout>
      <BookBanner 
        userId={userId}
        readingId={readingId}
        book={readingData.book}
        joinedUsers={usersIdArray}
        setUsers={setUsers}
        setJoinedUsers={setUsersIdArray}
      />
      <UsersComments joinedUsers={usersIdArray} users={users} comments={readingData.comments} readingId={readingId} userId={userId}/>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const readingId = context.params.id


  const readingData = await queries.readings.fetch(readingId)

  return { props: {readingData, readingId} }
}
export default ReadingView;