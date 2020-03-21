import UserBooks from "../../src/components/Users/UserBooks";

const userBooks = {
  favourites: [
    {
      id: 55,
      title: "Cakes in Space",
      image_url:
        "http://books.google.com/books/content?id=hn5cDAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      authors: ["Giulia Montanari", "Maya Halatcheva-Trapp"]
    },
    {
      id: 106,
      title: "Changing Images of Pictorial Space",
      image_url:
        "http://books.google.com/books/content?id=sSwy1keEmf8C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      authors: ["Graham Nerlich"]
    },
    {
      id: 11,
      title: "Spaces of Hope",
      image_url:
        "http://books.google.com/books/content?id=W00VHZg3u2MC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      authors: ["Doreen 'BOSS' Massey"]
    }
  ]
};
export default function UserView() {
  return (
    <div>
      USER
      <UserBooks favourites={userBooks} />
    </div>
  );
}
