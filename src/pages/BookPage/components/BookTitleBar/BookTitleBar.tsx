import { Paper, CardContent, Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import Star from '@material-ui/icons/Star';
import BookTitleBarMetaFlag from './BookTitleBarMetaFlag/BookTitleBarMetaFlag';
import generateAuthorString from '../../../../helpers/generateAuthorString';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1, 0, 0, 0),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metaData: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-evenly',
    order: 3,
    minWidth: 100,
    [theme.breakpoints.down('xs')]: {
      order: 2,
    },
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  ratings: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(1),
  },
  star: {
    marginRight: '2px',
  },
  title: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    flexGrow: 1,
    order: 2,
    [theme.breakpoints.down('xs')]: {
      order: 3,
      flex: '1 0 100%',
    },
  },
}));

const BookTitleBar = (props) => {
  const classes = useStyles();

  const userBook = {
    bookId: props.bookId,
    userId: props.userId,
  };

  const userFlags = [
    {
      type: 'reads',
      count: props.reads,
      status: props.userRead,
      icon_active: <CheckCircleIcon />,
      icon_inactive: <CheckCircleOutlineIcon />,
      error: 'You must be logged in to mark books as read.',
      tooltip: 'Mark as read',
    },
    {
      type: 'wishlist',
      count: props.wishes,
      status: props.userWishlist,
      icon_active: <BookmarkIcon />,
      icon_inactive: <BookmarkBorderIcon />,
      error: 'You must be logged in to add books to your wishlist.',
      tooltip: 'Add to your wishlist',
    },
    {
      type: 'favourites',
      count: props.favs,
      status: props.userFav,
      icon_active: <FavoriteIcon />,
      icon_inactive: <FavoriteBorderIcon />,
      error: 'You must be logged in to mark books favourites.',
      tooltip: 'Add to your favourites',
    },
  ];

  const authorString = props.authors
    ? generateAuthorString(props.authors)
    : 'Author Unknown';

  const generateRatingString = (rating, count) => {
    const score = rating || '-';
    return `${score} (${count} rating${Number(count) === 1 ? '' : 's'})`;
  };

  return (
    <Grid item xs={12}>
      <Paper className={classes.root}>
        <img src={props.img} />

        <div className={classes.metaData}>
          <div className={classes.ratings}>
            <Star htmlColor="#ffd54f" className={classes.star} />
            <Typography component="h1">
              {generateRatingString(props.rating, props.ratings)}
            </Typography>
          </div>

          {userFlags.map((flag, index) => (
            <BookTitleBarMetaFlag
              userBook={userBook}
              flag={flag}
              key={index}
              loggedIn={props.userId}
            />
          ))}
        </div>

        <CardContent className={classes.title}>
          <Typography variant="h5" component="h1">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {authorString} - {props.year}
          </Typography>
        </CardContent>
      </Paper>
    </Grid>
  );
};

export default BookTitleBar;
