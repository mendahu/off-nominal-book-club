const queries = require("../../db/queries/users");
import ProfileBanner from "../../src/components/Users/ProfileBanner";
import TabPanel from "../../src/components/General/TabPanel";

function UserView({ userBooks }) {
  const displayData = {
    image: "image_url",
    title: "title",
    secondary: "author"
  };

  return (
    <div>
      <ProfileBanner user={userBooks.user[0]} />
      {console.log(userBooks.books)}
      <TabPanel
        tabs={["Favorites", "Read List", "Wish List", "Reviews"]}
        lists={[
          userBooks.books.favourites,
          userBooks.books.reads,
          userBooks.books.wishlist,
          userBooks.books.ratings
        ]}
        displayData={displayData}
      />
    </div>
  );
}

export async function getServerSideProps(context) {
  const queryId = context.params.id;
  console.log(queryId);
  // const userBooks = await axios.get(`/api/users/${queryId}`);
  const userBooks = await queries.users.getUserData(queryId);
  console.log(userBooks);
  return { props: { userBooks } };
}

export default UserView;
