import UserListItem from "./UserListItem";

export default function UserList(props) {
  return (
    <section>
      {props.users.map((user, index) => (
        <UserListItem key={index} user={user} />
      ))}
    </section>
  );
}
