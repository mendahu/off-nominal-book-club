import { 
  Paper,
  CardContent,
  Box,
  Grid,
  Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import Star from "@material-ui/icons/Star";
import BookTitleBarMetaFlag from "./BookTitleBarMetaFlag";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1, 0, 0, 0 ),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: "space-between"
  },
  stats: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    order: 3,
    minWidth: 100,
    [theme.breakpoints.down("xs")]: {
      order: 2
    }
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    flex: "1 0 300px",
    order: 2,
    [theme.breakpoints.down("xs")]: {
      order: 3,
      flex: "1 0 100%"
    }
  },
  stat: {
    alignItems: "center"
  },
  bigStat: {
    display: "flex",
    justifyContent: "center",
    paddingLeft: 4
  },
}));

const BookTitleBar = (props) => {

  const classes = useStyles();

  const userBook = {
    bookId: props.bookId,
    userId: props.userId,
  }

  const userFlags = [
    {
      type: "reads", 
      count: props.reads,
      status: props.userRead,
      icon_active: <CheckCircleIcon />, 
      icon_inactive: <CheckCircleOutlineIcon />,
      error: "You must be logged in to mark books as read."
    },
    {
      type: "wishlist", 
      count: props.wishes,
      status: props.userWishlist,
      icon_active: <BookmarkIcon />, 
      icon_inactive: <BookmarkBorderIcon />,
      error: "You must be logged in to add books to your wishlist."
    },
    {
      type: "favourites", 
      count: props.favs,
      status: props.userFav,
      icon_active: <FavoriteIcon />, 
      icon_inactive: <FavoriteBorderIcon />,
      error: "You must be logged in to mark books favourites."
    }
  ]

  const authorString = props.authors 
    ? props.authors.map(author => author.name).join(", ")
    : 'Author Unknown' 

  return (
    <Grid item xs={12}>
      <Paper className={classes.root}>

        <img src={props.img} />

        <CardContent className={classes.stats}>
          <Box className={classes.bigStat}>
            <Star htmlColor='#ffd54f'/>
            <Typography component='h1'>
              {props.rating || "-"}
            </Typography>
          </Box>

          {userFlags.map((flag, index) => (
            <BookTitleBarMetaFlag 
              userBook={userBook}
              flag={flag}
              key={index}
              className={classes.stat}
              loggedIn={props.userId}
              />
            ))}
        </CardContent>

        <CardContent className={classes.content}>  
          <Typography 
            variant='h5' 
            component='h1' >{props.title}</Typography>
          <Typography 
            variant='body2'
            className={classes.authors}
            color='textSecondary'>{authorString} - {props.year}</Typography>
        </CardContent>

      </Paper>
    </Grid>
  )
}

export default BookTitleBar