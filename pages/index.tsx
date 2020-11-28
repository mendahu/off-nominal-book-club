import { Container, makeStyles } from '@material-ui/core';
import SearchBar from '../src/components/SearchBar';
import {
  Carousel,
  TagList,
  SearchResults,
  SearchFilters,
} from '../src/pages/LandingPage';
import Layout from '../src/components/LandingLayout';
import useSearch from '../src/pages/LandingPage/useSearch/useSearch';
import SnackbarContext from '../src/contexts/SnackbarContext';
import {
  OnbcSnackbar,
  useSnackbar,
} from '../src/hooks/useSnackbar/useSnackbar';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
}));

export const LandingPage = () => {
  const classes = useStyles();
  const { snackBarContent, triggerSnackbar, closeSnackbar } = useSnackbar();
  const { books, input, tags, selectTag, filters } = useSearch();

  const handleClear = (e) => {
    e.preventDefault();
    input.set('');
    selectTag('');
  };

  return (
    <Layout>
      <SnackbarContext.Provider value={triggerSnackbar}>
        <Container component="section" disableGutters={true} maxWidth={false}>
          <Carousel />
        </Container>
        <Container component="main" maxWidth={false}>
          <div className={classes.container}>
            <SearchBar
              placeholderText={'Search the Book Club'}
              text={input.value}
              onChange={(e) => input.set(e.target.value)}
              button={{ text: 'Clear', onClick: handleClear }}
            />
          </div>
          <div className={classes.container}>
            <SearchFilters filters={filters.value} setFilter={filters.set} />
          </div>
          <div className={classes.container}>
            <TagList
              tags={tags.tags}
              clickHandler={selectTag}
              loading={tags.loading}
            />
          </div>
          <div className={classes.container}>
            <SearchResults
              results={books.books}
              loading={books.loading}
              tagClickHandler={selectTag}
            />
          </div>
        </Container>
        <OnbcSnackbar content={snackBarContent} closeSnackbar={closeSnackbar} />
      </SnackbarContext.Provider>
    </Layout>
  );
};

export default LandingPage;
