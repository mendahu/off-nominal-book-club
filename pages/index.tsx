import { Container, makeStyles } from '@material-ui/core';
import SearchBar from '../src/components/SearchBar';
import TagList from '../src/pages/LandingPage/TagList/TagList';
import { Carousel } from '../src/pages/LandingPage/Carousel/Carousel';
import Layout from '../src/components/LandingLayout';
import SearchResults from '../src/pages/LandingPage/SearchResults/SearchResults';
import useSearch from '../src/pages/LandingPage/useSearch/useSearch';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
}));

export const LandingPage = () => {
  const classes = useStyles();

  const { books, input, tags, selectTag } = useSearch();

  const handleClear = (e) => {
    e.preventDefault();
    input.set('');
    selectTag('');
  };

  return (
    <Layout>
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
    </Layout>
  );
};

export default LandingPage;
