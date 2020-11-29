import { makeStyles } from '@material-ui/core/styles';
import { Typography, Link } from '@material-ui/core';
import urlGenerator from '../../../helpers/urlGenerator';
import generateAuthorString from '../../../helpers/generateAuthorString'

const useStyles = makeStyles((theme) => ({
  listItem: {
    listStyleType: 'none',
    marginTop: theme.spacing(4),
  },
  imageContainer: {
    width: '70px',
    padding: '0 5px',
  },
  bookImage: {
    width: '60px',
  },
  item: {
    display: 'flex',
  },
  textContainer: {
    marginLeft: theme.spacing(2),
  },
  author: {
    marginTop: theme.spacing(1),
  },
}));

export const ProfileBookListItem = ({ book }) => {
  const classes = useStyles();

  const authorString = generateAuthorString(book.authors)
  const bookUrl = urlGenerator(book.id, authorString, book.title);

  return (
    <li className={classes.listItem}>
      <div className={classes.item}>
        <div className={classes.imageContainer}>
          <Link href={`../books/${bookUrl}`}>
            <img
              className={classes.bookImage}
              src={book.image_url}
              alt={book.title}
            />
          </Link>
        </div>
        <div className={classes.textContainer}>
          <Typography component="h3" variant="body1">
            <Link href={`../books/${bookUrl}`} color="inherit" underline="none">
              {book.title}
            </Link>
          </Typography>
          <Typography
            component="h4"
            variant="caption"
            className={classes.author}
          >
            {authorString}
          </Typography>
        </div>
      </div>
    </li>
  );
};

export default ProfileBookListItem;
