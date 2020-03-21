import UserBooks from "../../src/components/Users/UserBooks";
import axios from "axios";
const queries = require("../../db/queries/users");

function UserView({ userBooks }) {
  return (
    <div>
      USER
      <UserBooks userBooks={userBooks} />
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
