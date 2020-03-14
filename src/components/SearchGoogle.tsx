// require("dotenv").config();
import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import SelectInput from "@material-ui/core/Select/SelectInput";
import CircularProgress from "@material-ui/core/CircularProgress";

interface BookType {
  title: string;
}

function sleep(delay = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      margin: "auto"
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1
    },
    iconButton: {
      padding: 10
    }
  })
);

export default function SearchGoogle() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<BookType[]>([]);
  const [books, setBooks] = useState({ items: [] });
  const loading = open && options.length === 0;

  const [searchTerm, setSearchTerm] = useState("");
  // const [apiKey, set] = useState(process.env.API_KEY);
  let API_URL = `https://www.googleapis.com/books/v1/volumes`;

  useEffect(() => {
    console.log("in not loading");
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      console.log(searchTerm.length);
      console.log(searchTerm);
      const response = await axios.get(
        `${API_URL}?q=${searchTerm}&maxResults=3`
      );
      const booklist = response.data;
      if (active) {
        console.log(booklist.items.map(book => book.volumeInfo));
        setOptions(booklist.items.map(book => book.volumeInfo) as BookType[]);
        console.log(options);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading && searchTerm.length > 3]);

  // useEffect(() => {
  //   console.log("in not Open use");
  //   if (!open) {
  //     setOptions([]);
  //   }
  // }, [open]);

  // const fetchBooks = async () => {
  //   if (searchTerm.length % 3 === 0) {
  //     const searchResult = await axios.get(
  //       `${API_URL}?q=${searchTerm}&maxResults=3`
  //     );
  //     setBooks(searchResult.data);
  //   }
  // };

  const onInputChange = event => {
    setSearchTerm(event.target.value);
    // fetchBooks();
  };

  return (
    <section>
      <Autocomplete
        id='asynchronous-demo'
        style={{ width: 300 }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        options={options}
        getOptionSelected={(option, value) => option.title === value.title}
        getOptionLabel={option => option.title}
        loading={loading}
        renderInput={params => (
          <TextField
            onChange={onInputChange}
            {...params}
            label='Asynchronous'
            variant='outlined'
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color='inherit' size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              )
            }}
          />
        )}
      />
      <br />

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <div style={{ width: 900 }}>
        <Autocomplete
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          options={books.items.map(option => option.volumeInfo.title)}
          renderInput={params => (
            <TextField
              onChange={onInputChange}
              {...params}
              label='search'
              margin='normal'
              variant='outlined'
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading ? (
                      <CircularProgress color='inherit' size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                )
              }}
            />
          )}
        />
      </div>
    </section>
  );
}
// <Paper
//   component='form'
//   className={classes.paper}
//   onSubmit={onSubmitHandler}>
//   <InputBase
//     className={classes.input}
//     placeholder='Search Google Books'
//     value={searchTerm}
//     onChange={onInputChange}
//   />
//   <IconButton
//     type='submit'
//     className={classes.iconButton}
//     aria-label='search'>
//     <SearchIcon />
//   </IconButton>
// </Paper>
// <ul>
//   {books.items.map((book, index) => {
//     return (
//       <li key={index}>
//         <div>
//           <img
//             alt={`${book.volumeInfo.title} book`}
//             src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
//           />
//           <div>
//             <h3>{book.volumeInfo.title}</h3>
//             <p>{book.volumeInfo.authors}</p>
//           </div>
//         </div>
//         <hr />
//       </li>
//     );
//   })}
// </ul>
