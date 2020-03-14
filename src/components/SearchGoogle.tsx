// require("dotenv").config();
import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import SelectInput from "@material-ui/core/Select/SelectInput";
import CircularProgress from "@material-ui/core/CircularProgress";

interface BookType {
  title: string;
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
  const loading = open && options.length === 0;

  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState({ items: [] });
  // const [apiKey, set] = useState(process.env.API_KEY);
  let API_URL = `https://www.googleapis.com/books/v1/volumes`;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await axios.get(
        `${API_URL}?q=${searchTerm}&maxResults=40`
      );

      if (active) {
        setOptions(response.data.items.map(book => book.volumeInfo.title));
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  const fetchBooks = async () => {
    const searchResult = await axios.get(
      `${API_URL}?q=${searchTerm}&maxResults=10`
    );
    setBooks(searchResult.data);
  };

  const onInputChange = event => {
    console.log(options);
    setSearchTerm(event.target.value);
    fetchBooks();
  };

  const onSubmitHandler = event => {
    event.preventDefault();
    fetchBooks();
  };
  return (
    <section>
      <div>
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
          getOptionSelected={(option, value) => option.title === value.title}
          getOptionLabel={option => option.title}
          options={options}
          loading={loading}
          renderInput={params => (
            <TextField
              {...params}
              onChange={onInputChange}
              label='Search Async'
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
      <div style={{ width: 900 }}>
        <Autocomplete
          freeSolo
          options={books.items.map(book => book.volumeInfo.title)}
          renderInput={params => (
            <TextField
              onChange={onInputChange}
              {...params}
              label='search'
              margin='normal'
              variant='outlined'
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
