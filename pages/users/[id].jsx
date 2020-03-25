const queries = require("../../db/queries/users");
import ProfileBanner from "../../src/components/Users/ProfileBanner";
import TabPanel from "../../src/components/General/TabPanel";
import Layout from "../../src/components/DefaultLayout";

function UserView({ userBooks }) {
  const displayData = {
    image: "image_url",
    title: "title",
    secondary: "author"
  };

  const link = "/books";

  return (
    <Layout>
      <ProfileBanner user={userBooks.user[0]} />
      <TabPanel
        tabs={["Favorites", "Read List", "Wish List", "Reviews"]}
        lists={[
          { favourites: userBooks.books.favourites },
          { reads: userBooks.books.reads },
          { wishlist: userBooks.books.wishlist },
          { ratings: userBooks.books.ratings }
        ]}
        displayData={displayData}
        link={link}
      />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const queryId = context.params.id;

  const userBooks = await queries.users.getUserData(queryId);

  return { props: { userBooks } };
}

export default UserView;
