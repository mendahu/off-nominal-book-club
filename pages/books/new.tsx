import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../src/components/DefaultLayout";
import Message from "../../src/components/Utility/Message";
import {
  Paper,
  Grid,
  Typography,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchBar from "../../src/components/SearchBar";
import { useDebounce } from "../../src/hooks/useDebounce/useDebounce";
import SearchResult from "../../src/components/New/SearchResult";
import SmallListItem from "../../src/components/New/SmallListItem";
import {
  getAuthorString,
  getThumbnail,
  getPublishedYear,
  getDescription,
  getTitle,
  getGoogleId,
  getIsbn10,
  getIsbn13,
  getAuthors,
} from "../../src/components/New/utils/newUtils";
import generateAuthorString from "../../src/helpers/generateAuthorString";
import Router from "next/router";
import urlGenerator from "../../src/helpers/urlGenerator";
import WarningRoundedIcon from "@material-ui/icons/WarningRounded";
import clsx from "clsx";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSnackbarContext } from "../../src/contexts/SnackbarContext";
import { ApiConfirmBook } from "../../src/types/api/apiTypes";
import { BookType } from "../../src/types/common.d";
import { generateBookThumbnailUrl } from "../../src/helpers/generateBookThumbnailUrl";
import { useBookClubUser } from "../../lib/bookClubUser";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
  selectedContainer: {
    marginBottom: theme.spacing(2),
  },
  item: {
    padding: theme.spacing(2),
  },
  metaDataContainer: {
    width: "100%",
  },
  submitButtonContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  flexContainer: {
    display: "flex",
    alignItems: "center",
  },
  warningIcon: {
    marginRight: theme.spacing(1),
    height: "100%",
  },
  formLegend: {
    marginBottom: theme.spacing(1),
  },
}));

export default function New() {
  const classes = useStyles();

  const { user, loading } = useBookClubUser();
  const triggerSnackbar = useSnackbarContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchError, setIsSearchError] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const [currentSelection, setCurrentSelection] = useState(null);
  const [isMatching, setIsMatching] = useState(false);
  const [isMatchError, setIsMatchError] = useState(false);
  const [matchedResults, setMatchedResults] = useState<ApiConfirmBook[]>(null);

  const [newBookMetaData, setNewBookMetaData] = useState(BookType.nonFiction);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const fetchGoogleResults = (
    searchString: string
  ): Promise<any[] | undefined> => {
    setIsSearchError(false);
    return axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchString}&maxResults=20`
      )
      .then((results) => results.data.items)
      .catch(() => {
        setIsSearchError(true);
        return [];
      });
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      fetchGoogleResults(debouncedSearchTerm).then((results) => {
        setIsSearching(false);
        setSearchResults(results);
      });
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (currentSelection) {
      setMatchedResults(null);
      setIsMatching(true);
      setIsMatchError(false);
      axios
        .get(
          `/api/books/new?googleid=${getGoogleId(
            currentSelection
          )}&isbn10=${getIsbn10(currentSelection)}&isbn13=${getIsbn13(
            currentSelection
          )}&title=${getTitle(currentSelection)}`
        )
        .then(({ data }) => {
          setMatchedResults(data.length ? data : null);
        })
        .catch(() => {
          setIsMatchError(true);
        })
        .finally(() => {
          setIsMatching(false);
        });
    }
  }, [currentSelection]);

  const selectBook = (book) => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    setCurrentSelection(book);
  };

  const submitBook = async (book) => {
    setIsSubmitting(true);

    const newBook = {
      book: {
        user_id: user.onbc_id,
        title: getTitle(book),
        description: getDescription(book),
        fiction: newBookMetaData === BookType.fiction ? true : false,
        textbook: newBookMetaData === BookType.textbook ? true : false,
        type: newBookMetaData,
        year: getPublishedYear(book),
        image_url: getThumbnail(book),
        google_id: getGoogleId(book),
        isbn13: getIsbn13(book),
      },
      authors: getAuthors(book),
    };

    let response;

    try {
      response = await axios.post(`/api/books/new`, newBook);
      setIsSubmitting(false);
      setIsRedirecting(true);
      Router.push(
        urlGenerator(response.data[0], getAuthorString(book), getTitle(book))
      );
    } catch (error) {
      setIsSubmitting(false);
      triggerSnackbar({
        active: true,
        message:
          "Something went wrong adding your book. Please try again later.",
        severity: "error",
      });
    }
  };

  const renderLoadingMessage = (variant, message: string) => {
    return (
      <Layout>
        <Message variant={variant} message={message} />
      </Layout>
    );
  };

  if (loading) {
    return renderLoadingMessage("loading", "Validating credentials...");
  }

  if ((!user && !loading) || (!user?.isPatron && !loading)) {
    return renderLoadingMessage(
      "warning",
      "You must be logged in and a Patron to add books."
    );
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
        clickHandler={() => selectBook(book)}
      />
    );
  };

  const handleMetaDataFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewBookMetaData((e.target as HTMLInputElement).value as BookType);
  };

  return (
    <Layout>
      <Grid container spacing={2} className={classes.container}>
        <Grid item xs={12} sm={12} md={6} lg={5}>
          {currentSelection && (
            <Paper className={clsx(classes.item, classes.selectedContainer)}>
              <Typography component="h1" variant="h6">
                Adding...
              </Typography>
              <SmallListItem
                imageUrl={getThumbnail(currentSelection)}
                title={getTitle(currentSelection)}
                authorString={getAuthorString(currentSelection)}
              />
            </Paper>
          )}
          <Paper className={clsx(classes.item)}>
            {!currentSelection && (
              <>
                <Typography component="h1" variant="h6">
                  Help grow the Off-Nominal Book Club
                </Typography>
                <hr />
                <Typography component="p" variant="subtitle1">
                  Search Google Books for great space books that should be in
                  our collection.
                </Typography>
              </>
            )}
            {isMatching && (
              <Typography component="p" variant="subtitle1">
                {"Checking our database if this book already exists..."}
              </Typography>
            )}
            {isMatchError && (
              <Message
                variant="warning"
                message={"Error checking the book club database"}
              />
            )}
            {matchedResults && (
              <>
                <div className={classes.flexContainer}>
                  <WarningRoundedIcon className={classes.warningIcon} />
                  <Typography component="h2" variant="h6">
                    {"Your book may already be in the book club..."}
                  </Typography>
                </div>

                {matchedResults.map((match, index) => {
                  if (index < 3) {
                    return (
                      <SmallListItem
                        key={index}
                        imageUrl={generateBookThumbnailUrl(match.google_id, 1)}
                        title={match.title}
                        authorString={generateAuthorString(match.authors)}
                        button={{ id: match.id }}
                      />
                    );
                  }
                })}
                <hr />
              </>
            )}
            {!isMatching && currentSelection && (
              <>
                {matchedResults && (
                  <Typography component="h1" variant="h6" paragraph>
                    Nope, the book I have is new.
                  </Typography>
                )}
                <FormControl
                  component="fieldset"
                  className={classes.metaDataContainer}
                >
                  <FormLabel component="legend" className={classes.formLegend}>
                    This book is best described as:
                  </FormLabel>
                  <RadioGroup
                    value={newBookMetaData}
                    onChange={handleMetaDataFormChange}
                  >
                    <FormControlLabel
                      value={BookType.fiction}
                      control={<Radio />}
                      label="This book is fiction"
                    />
                    <FormControlLabel
                      value={BookType.nonFiction}
                      control={<Radio />}
                      label="This book is non-fiction"
                    />
                    <FormControlLabel
                      value={BookType.textbook}
                      control={<Radio />}
                      label="This is a reference book or textbook"
                    />
                  </RadioGroup>
                </FormControl>
                <div className={classes.submitButtonContainer}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => submitBook(currentSelection)}
                    endIcon={
                      (isSubmitting || isRedirecting) && (
                        <CircularProgress color="inherit" size={20} />
                      )
                    }
                  >
                    {isSubmitting && "Submitting..."}
                    {isRedirecting && "Redirecting..."}
                    {!(isSubmitting || isRedirecting) && "Add book"}
                  </Button>
                </div>
              </>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={7}>
          <SearchBar
            placeholderText="Search here"
            onChange={(event) => setSearchTerm(event.target.value)}
            text={searchTerm}
          />
          <div>
            {isSearching && (
              <Message
                variant={"loading"}
                message={"Searching Google Books..."}
              />
            )}
            {isSearchError && (
              <Message
                variant={"warning"}
                message={"Error reaching Google Books"}
              />
            )}
            {!isSearching &&
              searchResults &&
              searchResults.map((result) => renderSearchResult(result))}
          </div>
        </Grid>
      </Grid>
    </Layout>
  );
}
