import Layout from "../../src/components/DefaultLayout"
// import BookBanner from "../../src/components/Readings/BookBanner"
// import queries from "../../db/queries/readings"
// import TabPanel from "../../src/components/General/TabPanel"
// import { Typography } from "@material-ui/core"
// import { useState } from "react"
import Message from '../../src/components/Utility/Message'

function ReadingView() {

  // if (!readingData.book.id) {
  //   return (
  //     <Layout>
  //       <Typography>The reading url you've entered is not in our database. Please try again.</Typography>
  //     </Layout>
  //   )
  // }

  // const [users, setUsers] = useState(readingData.users)

  // const [usersIdArray, setUsersIdArray] = useState(readingData.users.map(user => {
  //   return user.id;
  // }))

  // const displayData = {
  //   image: "avatar_url",
  //   title: "name",
  // };

  // const link = '/users'
  

  return (
    <Layout>
      <Message variant='warning' message='The readings feature is temporarily disabled.' />
    </Layout>
  );
};

// export async function getServerSideProps(context) {
//   const readingId = context.params.id

//   const readingData = await queries.readings.fetch(readingId)

//   return { props: {readingData, readingId} }
// }

export default ReadingView;

/*
This feature temporarily disabled
When reenabled, render the following code

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

*/