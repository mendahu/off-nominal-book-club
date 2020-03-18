import { Chip, Paper } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const BookTitleBar = (props) => {
  const classes = useStyles();

  const userFlags = [
    {active: "Mark as Unread", inactive: "Mark as Read", status: props.read, icon_active: <CheckCircleIcon />, icon_inactive: <CheckCircleOutlineIcon /> },
    {active: "Remove from Wishlist", inactive: "Add to Wishlist", status: props.wishlist, icon_active: <BookmarkIcon />, icon_inactive: <BookmarkBorderIcon />},
    {active: "Unfavourite", inactive: "Add to Favs", status: props.fav, icon_active: <FavoriteIcon />, icon_inactive: <FavoriteBorderIcon />}
  ]

  return (
    <Paper>
      <h1>{props.title}</h1>
      <h2>Userid: {props.userId}</h2>
      <h4>{props.authors.map((author) => author.name + " - ")} {props.year}</h4>
      <Paper className={classes.root}>
        {userFlags.map((f, index) => (
          <Chip
            key={index}
            label={f.active}
            icon={(f.status) ? f.icon_active : f.icon_inactive}
            className={classes.chip}
            color={(f.status) ? "primary" : "default"}
          />))}
      </Paper>
      <img src={props.img} />
    </Paper>
  )
}

export default BookTitleBar