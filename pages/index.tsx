import { Container, makeStyles } from '@material-ui/core';
import SearchBar from '../src/components/SearchBar';
import TagList from '../src/components/Landing/TagList';
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

  const { search, input, tags } = useSearch();

  // let bookSearch;

  // useEffect(() => {
  //   axios.get('/api/books/').then((res) => {
  //     setSearchResults(res.data);
  //     bookSearch = new Fuse(res.data, bookOptions);
  //   });
  // }, []);

  // const tagSearch = tags ? new Fuse(tags, tagOptions) : null;

  // async function getSearchResults(term) {
  //   const bookData = await bookSearch
  //     .search(term)
  //     .slice(0, 5)
  //     .map((item) => {
  //       return item.item;
  //     });
  //   const tagsData = await tagSearch.search(term).map((tag) => {
  //     return tag.item;
  //   });

  //   setSearchResults(bookData);
  //   setTagList(tagsData);
  // }

  // async function selectTag(tag) {
  //   const bookData = await axios.get(`/api/tags/${tag}`);
  //   setSearchResults(bookData.data);
  // }

  // const onInputChange = (event) => {
  //   setInput(event.target.value);
  //   event.target.value !== ''
  //     ? getSearchResults(event.target.value)
  //     : setSearchResults(books);
  // };

  const handleClear = (e) => {
    e.preventDefault();
    input.set('');
    // setTagList(tags);
    // setInput('');
    // setSearchResults(books);
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
          <TagList tags={tags.tags} />
        </div>
        <div className={classes.container}>
          <SearchResults results={search.results} loading={search.loading} />
        </div>
      </Container>
    </Layout>
  );
};

export default LandingPage;
