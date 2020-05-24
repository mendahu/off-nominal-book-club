import LayoutComponent from '../General/LayoutComponent';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  //
}));

const ProfileWishList = (props) => {
  const classes = useStyles();

  const { books, ...rest } = props;

  return (
    <LayoutComponent {...rest}>
      <Typography>Wishlist</Typography>
      <ul>
        {books.map((book, index) => (
          <li key={index}>{book.title}</li>
        ))}
      </ul>
    </LayoutComponent>
  );
};

export default ProfileWishList;
