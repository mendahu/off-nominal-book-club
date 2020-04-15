export default function userDataFormatter(user) {

  const { name, nickname, picture, app_metadata: { onbc_id } } = user

  const formattedUser = {
    name,
    nickname,
    picture,
    app_metadata: {
      onbc_id
    }
  };

  return formattedUser;
}