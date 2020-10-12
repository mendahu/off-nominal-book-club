import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFetchUser } from '../../lib/user';
import Layout from '../../src/components/DefaultLayout';
import Message from '../../src/components/Utility/Message';
import { Paper, Grid, Typography, Button, FormControl, FormControlLabel, FormLabel, Checkbox, FormGroup } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchBar from '../../src/components/SearchBar';
import { useDebounce } from '../../src/hooks/useDebounce'
import SearchResult from '../../src/components/New/SearchResult'
import { getAuthorString, getThumbnail, getPublishedYear, getDescription, getTitle, getGoogleId, getIsbn13, getAuthors } from '../../src/components/New/utils/newUtils'
import generateAuthorString from '../../src/helpers/generateAuthorString';
import Router from 'next/router';
import urlGenerator from '../../src/helpers/urlGenerator';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
  item: {
    padding: theme.spacing(2),
  },
  matchedSelection: {
    display: 'flex',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    alignItems: 'center'
  },
  smallThumb: {
    width: "60px"
  },
  matchedSelectionInfoBox: {
    marginLeft: theme.spacing(1),
    flexGrow: 1,
  },
  metaDataContainer: {
    width: "100%"
  },
  submitButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));

export default function New() {
  const classes = useStyles();

  const { user, loading } = useFetchUser();

  const [isSearching, setIsSearching] = useState(false)
  const [isSearchError, setIsSearchError] = useState(false)
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const [currentSelection, setCurrentSelection] = useState(null)
  const [isMatching, setIsMatching] = useState(false)
  const [isMatchError, setIsMatchError] = useState(false)
  const [matchedResults, setMatchedResults] = useState(null)

  const [newBookMetaData, setNewBookMetaData] = useState({fiction: false, textbook: false})
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [isSubmitError, setIsSubmitError] = useState(false)

  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  const fetchGoogleResults = (searchTerm: string): Promise<any[] | undefined> => {
    setIsSearchError(false)
    return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=20`)
      .then((results) => results.data.items)
      .catch(() => {
        setIsSearchError(true)
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

  useEffect(() => {
    if (currentSelection) {
      setMatchedResults(null)
      setIsMatching(true)
      setIsMatchError(false)
      axios.get(
        `/api/books/new?googleid=${getGoogleId(currentSelection)}&isbn13=${getIsbn13(currentSelection)}&title=${getTitle(currentSelection)}`
      )
        .then(({data}) => {
          setMatchedResults(data.length ? data : null)
        })
        .catch(() => {
          setIsMatchError(true)
        })
        .finally(() => {
          setIsMatching(false)
        })
    }
  }, [currentSelection])

  const selectBook = (book) => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    })
    setCurrentSelection(book)
  }

  const submitBook = async (book) => {
    setIsSubmitting(true)
    setIsSubmitError(false)

    const newBook = {
      book: {
        user_id: user.onbc_id,
        title: getTitle(book),
        description: getDescription(book),
        fiction: newBookMetaData.fiction,
        textbook: newBookMetaData.textbook,
        year: getPublishedYear(book),
        image_url: getThumbnail(book),
        google_id: getGoogleId(book),
        isbn13: getIsbn13(book),
      },
      authors: getAuthors(book),
    };

    try {
      const response = await axios.post(`/api/books/new`, newBook)
      console.log(urlGenerator(response[0], getAuthorString(newBook), getTitle(book)))
      setIsRedirecting(true)
      Router.push(urlGenerator(response[0], getAuthorString(newBook), getTitle(book)));
    } catch(error) {
      setIsSubmitError(true)
      setTimeout(() => {
        setIsRedirecting(true)
        Router.push('/books/new');
      }, 2000)
    }

    if (isRedirecting) {
      setIsRedirecting(false)
    }
    setIsSubmitting(false)
  }

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

  const renderSearchResult = (book) => {
    return (
      <SearchResult
        key={book.id}
        cover={getThumbnail(book)}
        title={getTitle(book)}
        authors={getAuthorString(book)}
        year={getPublishedYear(book)}
        description={getDescription(book)}
        clickHandler={() => selectBook(book)} />
    )
  }

  return (
    <Layout>
      <Grid container spacing={2} className={classes.container}>
        <Grid item xs={12} sm={12} md={6} lg={5}>
          <Paper className={classes.item}>
            <Typography component="h1" variant="h6">{currentSelection ? `Adding ${currentSelection.volumeInfo.title}...` : "Search for your book below"}</Typography>
            <hr />
            {isMatching && <p>{"Validating your result"}</p>}
            {isMatchError && <Message variant="warning" message={"Error checking the book club database"} />}
            {matchedResults && 
              <>
                <Typography component="h2" variant="subtitle1">{"Your book may already be in the book club..."}</Typography>
                {matchedResults.map((match, index) => {
                  if (index < 3 ) {
                    return (
                      <div className={classes.matchedSelection} key={index}>
                        <div>
                          <img src={match.image_url} className={classes.smallThumb}/>
                        </div>
                        <div className={classes.matchedSelectionInfoBox}>
                          <Typography component="h3" variant="h6">{match.title}</Typography>
                          <Typography component="h4" variant="subtitle1">{generateAuthorString(match.authors)}</Typography>
                        </div>
                        <div>
                          <Button variant="contained" color="primary" href={urlGenerator(match.id, generateAuthorString(match.authors), match.title)}>Take me there!</Button>
                        </div>
                      </div>
                    )
                  }
                })}
                <hr />
              </>
            }
            {!isMatching && currentSelection &&
              <>
                <FormControl component="fieldset" className={classes.metaDataContainer}>
                  <FormLabel component="legend">Tell us about this book</FormLabel>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox checked={newBookMetaData.fiction} onChange={(event) => setNewBookMetaData({...newBookMetaData, fiction: event.target.checked})} />} label="This book is fiction" />
                    <FormControlLabel control={<Checkbox checked={newBookMetaData.textbook} onChange={(event) => setNewBookMetaData({...newBookMetaData, textbook: event.target.checked})} />} label="This is a reference book or textbook" />
                  </FormGroup>
                </FormControl>
                <div className={classes.submitButtonContainer}>
                  <Button variant="contained" color="primary" onClick={() => submitBook(currentSelection)}>Add Book</Button>
                </div>
              </>
            }
          </Paper>
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={7}>
          <SearchBar
            placeholderText="Search Google Books"
            onChange={(event) => setSearchTerm(event.target.value)}
            text={searchTerm}
          />
          <div>
            {isSearching && <Message variant={"loading"} message={"Searching Google Books..."} />}
            {isSearchError && <Message variant={"warning"} message={"Error reaching Google Books"} />}
            {!isSearching && searchResults && searchResults.map((result) => renderSearchResult(result))}
          </div>
        </Grid>
      </Grid>
    </Layout>
  );
}
