//defaults returned by getServerSideProps
const userData = {
  user_tags: [],
  read: false, 
  wishlist: false, 
  fav: false, 
  rating: null, 
  review: null,
  name: ""
}
const book = null;

export const userProfileFetcher_NOUSER = (req) => {

  return { 
    props: {
      slug: 'wrong-url-slug',
      book,
      userData,
    }
  }
}

const testUserProfileFetcher = {
  userProfileFetcher_NOUSER
}

export default testUserProfileFetcher;