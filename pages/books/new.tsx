import React from "react";
import BookNew from "../../src/components/BookNew";
import SearchGoogle from "../../src/components/SearchGoogle";
import TestSearchGoogle from "../../src/components/TestSearchGoogle";

const AddBook = props => {
  return (
    <main>
      <div>
        <SearchGoogle />
      </div>
      <div>
        <BookNew
          title='The Martian'
          author='Andy Weir'
          year='2011'
          description='An astronaut becomes stranded on Mars after his team assume
        him dead, and must rely on his ingenuity to find a way to
        signal to Earth that he is alive.'
          img='data:image/jpeg;base64,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'
        />
      </div>
    </main>
  );
};

export default AddBook;

// // <div>
// //   <BookNew title='The Martian' year='2011' />
// // </div>

// export default function SearchGoogle() {
//   const classes = useStyles();

//   const [searchTerm, setSearchTerm] = useState(" ");
//   const [books, setBooks] = useState({ items: [] });
//   // const [apiKey, set] = useState(process.env.API_KEY);
//   let API_URL = `https://www.googleapis.com/books/v1/volumes`;

//   const fetchBooks = async () => {
//     const searchResult = await axios.get(
//       `${API_URL}?q=${searchTerm}&maxResults=5`
//     );
//     console.log(searchResult.data);
//     setBooks(searchResult.data);
//   };

//   const onInputChange = event => {
//     setSearchTerm(event.target.value);
//     fetchBooks();
//   };

//   const onSubmitHandler = event => {
//     event.preventDefault();
//     fetchBooks();
//   };
//   return (
//     <section>
//       <div style={{ width: 900 }}>
//         <Autocomplete
//           freeSolo
//           options={books.items.map(book => book.volumeInfo.title)}
//           renderInput={params => (
//             <TextField
//               onChange={onInputChange}
//               {...params}
//               label='search'
//               margin='normal'
//               variant='outlined'
//             />
//           )}
//         />
//       </div>
//     </section>
//   );
// }
// // <Paper
// //   component='form'
// //   className={classes.paper}
// //   onSubmit={onSubmitHandler}>
// //   <InputBase
// //     className={classes.input}
// //     placeholder='Search Google Books'
// //     value={searchTerm}
// //     onChange={onInputChange}
// //   />
// //   <IconButton
// //     type='submit'
// //     className={classes.iconButton}
// //     aria-label='search'>
// //     <SearchIcon />
// //   </IconButton>
// // </Paper>
// // <ul>
// //   {books.items.map((book, index) => {
// //     return (
// //       <li key={index}>
// //         <div>
// //           <img
// //             alt={`${book.volumeInfo.title} book`}
// //             src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
// //           />
// //           <div>
// //             <h3>{book.volumeInfo.title}</h3>
// //             <p>{book.volumeInfo.authors}</p>
// //           </div>
// //         </div>
// //         <hr />
// //       </li>
// //     );
// //   })}
// // </ul>
