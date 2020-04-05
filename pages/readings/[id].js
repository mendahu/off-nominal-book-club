import Layout from "../../src/components/DefaultLayout"
import BookBanner from "../../src/components/Readings/BookBanner"
import queries from "../../db/queries/readings"
import UserContext from "../../src/UserContext"
import TabPanel from "../../src/components/General/TabPanel"
import { Typography } from "@material-ui/core"
import { useContext, useState } from "react"

function ReadingView( {readingData, readingId} ) {

  if (!readingData.book.id) {
    return (
      <Layout>
        <Typography>The reading url you've entered is not in our database. Please try again.</Typography>
      </Layout>
    )
  }

  const { userId } = useContext(UserContext)

  const [users, setUsers] = useState(readingData.users)

  const [usersIdArray, setUsersIdArray] = useState(readingData.users.map(user => {
    return user.id;
  }))

  const displayData = {
    image: "avatar_url",
    title: "name",
  };

  const link = '/users'
  

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
      <TabPanel 
        tabs={["Users", "Comments"]}
        lists={[{users: users}, {comments: readingData.comments}]}
        displayData={displayData}
        joinedUsers={usersIdArray}
        userId={userId}
        readingId={readingId}
        link={link}
      />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const readingId = context.params.id

  const readingData = await queries.readings.fetch(readingId)

  return { props: {readingData, readingId} }
}
export default ReadingView;