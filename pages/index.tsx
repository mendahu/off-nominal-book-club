import { Container, makeStyles } from '@material-ui/core';
import SearchBar from '../src/components/SearchBar';
import TagList from '../src/components/Landing/TagList';
import { Carousel } from '../src/pages/LandingPage/Carousel/HeroCarousel';
import { useState, useEffect } from 'react';
import Layout from '../src/components/LandingLayout';
import axios from 'axios';
import Fuse from 'fuse.js';
import { bookOptions, tagOptions } from '../config/search.json';
import SearchResults from '../src/pages/LandingPage/SearchResults/SearchResults';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
}));

export default function App(props) {
  const classes = useStyles();

  const [searchResults, setSearchResults] = useState([]);
  const [tagList, setTagList] = useState();
  const [input, setInput] = useState('');

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

  // const clearResults = (e) => {
  //   e.preventDefault();
  //   setTagList(tags);
  //   setInput('');
  //   setSearchResults(books);
  // };

  return (
    <div>
      <Layout>
        <Container component="section" disableGutters={true} maxWidth={false}>
          <Carousel />
        </Container>
        <Container component="main" maxWidth={false}>
          <div className={classes.container}>
            {' '}
            <SearchBar
              placeholderText={'Search the Off-Nominal Book Club'}
              text={input}
              onChange={() => {}}
              button={{ text: 'Clear', onClick: () => {} }}
            />
          </div>
          <div className={classes.container}>
            <TagList tags={tagList} />
          </div>
          <div className={classes.container}>
            <SearchResults books={searchResults} />
          </div>
        </Container>
      </Layout>
    </div>
  );
}
