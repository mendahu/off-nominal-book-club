import { Container, Grid, makeStyles } from "@material-ui/core";
import SearchBar from "../src/components/SearchBar";
import {
  Carousel,
  TagList,
  SearchResults,
  SearchFilters,
} from "../src/pages/LandingPage";
import Layout from "../src/components/LandingLayout";
import useSearch from "../src/pages/LandingPage/useSearch/useSearch";
import SnackbarContext from "../src/contexts/SnackbarContext";
import {
  OnbcSnackbar,
  useSnackbar,
} from "../src/hooks/useSnackbar/useSnackbar";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  searchContainer: {
    marginTop: theme.spacing(1),
  },
  searchBarContainer: {
    flexGrow: 4,
    [theme.breakpoints.up("lg")]: {
      order: 2,
      minWidth: "50%",
    },
  },
  filterContainer: {
    flexGrow: 1,
    [theme.breakpoints.up("lg")]: {
      order: 1,
      maxWidth: "30%",
    },
  },
  tagListContainer: {
    width: "100%",
    [theme.breakpoints.up("lg")]: {
      order: 3,
      maxWidth: "30%",
      flexGrow: 1,
    },
  },
  searchResultsContainer: {
    width: "100%",
    [theme.breakpoints.up("lg")]: {
      order: 4,
      width: "70%",
      flexGrow: 4,
    },
  },
}));

export const LandingPage = () => {
  const classes = useStyles();
  const { snackBarContent, triggerSnackbar, closeSnackbar } = useSnackbar();
  const { books, input, tags, selectTag, filters } = useSearch();

  const handleClear = (e) => {
    e.preventDefault();
    input.set("");
    selectTag("");
  };

  return (
    <Layout>
      <SnackbarContext.Provider value={triggerSnackbar}>
        <Container component="section" disableGutters={true} maxWidth={false}>
          <Carousel />
        </Container>
        <Container>
          <Grid
            container
            spacing={2}
            component="main"
            className={classes.searchContainer}
          >
            <Grid item className={clsx(classes.searchBarContainer)}>
              <SearchBar
                placeholderText={"Search the Book Club"}
                text={input.value}
                onChange={(e) => input.set(e.target.value)}
                button={{ text: "Clear", onClick: handleClear }}
              />
            </Grid>
            <Grid item className={clsx(classes.filterContainer)}>
              <SearchFilters filters={filters.value} setFilter={filters.set} />
            </Grid>
            <Grid item className={classes.tagListContainer}>
              <TagList
                tags={tags.tags}
                clickHandler={selectTag}
                loading={tags.loading}
              />
            </Grid>
            <Grid item className={classes.searchResultsContainer}>
              <SearchResults
                results={books.books}
                loading={books.loading}
                tagClickHandler={selectTag}
              />
            </Grid>
          </Grid>
        </Container>
        <OnbcSnackbar content={snackBarContent} closeSnackbar={closeSnackbar} />
      </SnackbarContext.Provider>
    </Layout>
  );
};

export default LandingPage;
