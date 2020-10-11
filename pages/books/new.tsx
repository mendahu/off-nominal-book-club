import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useFetchUser } from '../../lib/user';
import Layout from '../../src/components/DefaultLayout';
import Message from '../../src/components/Utility/Message';
import { Paper, Grid, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchBar from '../../src/components/SearchBar';
import { useDebounce } from '../../src/hooks/useDebounce'
import SearchResult from '../../src/components/New/SearchResult'
// import ConfirmResults from '../../src/components/New/ConfirmResults';
// import Router from 'next/router';
// import urlGenerator from '../../src/helpers/urlGenerator';
// import generateAuthorString from '../../src/helpers/generateAuthorString';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
  item: {
    padding: theme.spacing(2),
  }
}));

export default function New() {
  const classes = useStyles();

  const { user, loading } = useFetchUser();
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false)
  const [currentSelection, setCurrentSelection] = useState(null)
  const [isError, setIsError] = useState(false)

  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  const fetchGoogleResults = (searchTerm: string): Promise<any[] | undefined> => {
    setIsError(false)
    return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=20`)
      .then((results) => results.data.items)
      .catch(() => {
        setIsError(true)
        return []
      })
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      fetchGoogleResults(debouncedSearchTerm).then(results => {
        setIsSearching(false);
        setSearchResults(results);
      });
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchTerm])

  const selectBook = (book) => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    })
    setCurrentSelection(book)
  }

  // const [isSearch, setIsSearch] = useState(true);
  // const [bookObj, setBookObj] = useState({
  //   book: {
  //     id: null,
  //     user_id: null,
  //     title: null,
  //     description: null,
  //     fiction: true,
  //     year: null,
  //     image_url: null,
  //     google_id: null,
  //     isbn13: null,
  //   },
  //   authors: null,
  // });

  // function redirectToBook(book, authors, data) {
  //   const baseUrl = `/books/`;
  //   const authorString = generateAuthorString(authors);
  //   const slug = urlGenerator(data || book.id, authorString, book.title);
  //   Router.push(baseUrl.concat(slug));
  // }

  // function redirectToCom() {
  //   Router.push(`/`);
  // }

  // // adds book to database with bookObj State and redirects to book/[book]
  // function addBook(book) {
  //   axios
  //     .post(`/api/books/new`, book)
  //     .then((res) => redirectToBook(book.book, book.authors, res.data[0]));
  // }

  // // sets search term to book.tile
  // function handleSearchTerm(title) {
  //   if (isSearch === true) {
  //     setSearchTerm(title);
  //   }
  // }

  // // sets searchResults state
  // function handleResults(value) {
  //   setSearchResults(value);
  // }

  // async function selectBook(book) {
  //   // format google book data into database format
  //   const selectedBook = {
  //     book: {
  //       user_id: user.onbc_id,
  //       title: book.title,
  //       description: book.description,
  //       fiction: true,
  //       year: book.year,
  //       image_url: book.image_url,
  //       google_id: book.google_id,
  //       isbn13: book.isbn13,
  //     },
  //     authors: book.author.map((a) => {
  //       return { name: a };
  //     }),
  //   };

  //   // setBookObj to formatted book
  //   setBookObj(selectedBook);

  //   // check if book exists in database
  //   const dbResults = await axios.get(
  //     `/api/books/new?googleid=${selectedBook.book.google_id}&isbn13=${selectedBook.book.isbn13}&title=${selectedBook.book.title}`
  //   );

  //   // if book has hits in db, set is search to false, and set search results to db hits
  //   if (dbResults.data.length > 0) {
  //     setIsSearch(false);
  //     setSearchResults(dbResults.data);

  //     // if no hits, add book to database and redirect to book
  //   } else {
  //     addBook(selectedBook);
  //   }
  // }

  // function toSearch() {
  //   setSearchResults([]);
  //   setIsSearch(true);
  // }

  const renderLoadingMessage = (variant, message: string) => {
    return (
      <Layout>
        <Message variant={variant} message={message} />
      </Layout>
    )
  }

  if (loading) {
    renderLoadingMessage("loading", "Validating credentials...");
  }

  if ((!user && !loading) || (!user?.isPatron && !loading)) {
    renderLoadingMessage("warning", "You must be logged in and a Patron to add books.");
  }

  const renderSearchMessage = (variant, message: string) => {
    return (
      <Message variant={variant} message={message} />
    )
  }

  const renderSearchResult = (book) => {
    const { volumeInfo: { title, authors, description, publishedDate, imageLinks }} = book;
    return (
      <SearchResult
        key={book.id}
        cover={imageLinks ? imageLinks.thumbnail : "/generic_book.png"}
        title={title}
        authors={authors ? authors.join(', ') : "No author"}
        year={new Date(publishedDate).getFullYear()}
        description={description || "No description available"}
        clickHandler={() => selectBook(book)} />
    )
  }

  return (
    <Layout>
      <Grid container spacing={2} className={classes.container}>
        <Grid item xs={12} sm={5}>
          <Paper className={classes.item}>
            {currentSelection ? <div>{currentSelection.volumeInfo.title}</div> : "Search for your book below"}
            </Paper>
        </Grid>

        <Grid item xs={12} sm={7}>
          <SearchBar
            placeholderText="Search Google Books"
            onChange={(event) => setSearchTerm(event.target.value)}
            text={searchTerm}
          />
          <div>
            {isSearching && renderSearchMessage("loading", "Searching Google Books...")}
            {isError && renderSearchMessage("warning", "Error reaching Google Books")}
            {!isSearching && searchResults && searchResults.map((result) => renderSearchResult(result))}
          </div>
        </Grid>
      </Grid>
      {/* {!loading &&
        user?.isPatron &&
        (isSearch ? (
          <>
            <SearchBar
              results={searchResults}
              setResults={handleResults}
              searchTerm={searchTerm}
              setTerm={handleSearchTerm}
              onClick={redirectToCom}
            />
            <SearchResultsList
              results={searchResults}
              selectBook={selectBook}
              buttonText={'Add Book'}
              isSearch={isSearch}
            />
          </>
        ) : (
          <>
            <ConfirmResults book={bookObj} onClick={addBook} back={toSearch} />
            <SearchResultsList
              results={searchResults}
              redirectToBook={redirectToBook}
              buttonText={'Go to Book'}
              isSearch={isSearch}
            />
          </>
        ))} */}
    </Layout>
  );
}
