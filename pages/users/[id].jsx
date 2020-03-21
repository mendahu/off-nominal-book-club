const queries = require("../../db/queries/users");
import UserBooks from "../../src/components/Users/UserBooks";
import ProfileBanner from "../../src/components/Users/ProfileBanner";

function UserView({ userBooks }) {
  return (
    <div>
      <ProfileBanner user={userBooks.user[0]} />
      <UserBooks books={userBooks.books} />
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
