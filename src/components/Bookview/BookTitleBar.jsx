import { useState } from "react";
import { Chip, Paper } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import axios from 'axios'

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
  const [state, setState ] = useState({
    read: props.read,
    wishlist: props.wishlist,
    fav: props.fav
  })

  const toggleRead = () => {
    if (state.read) {
      console.log(state.read)
      axios.delete(`/api/reads/${state.read}`)
      .then(() => {
        setState({...state, read: false})
      })
      .catch(err => console.log(error))
    } else {
      axios.post(`/api/reads/new`, {
        bookId: props.bookId,
        userId: props.userId,
      })
      .then(res => {
        console.log("other side of API returned id", res)
        setState({...state, read: res.data[0]})
      })
      .catch(err => console.log(err))
    }
  }

  const userFlags = [
    {active: "Mark as Unread", inactive: "Mark as Read", status: state.read, icon_active: <CheckCircleIcon />, icon_inactive: <CheckCircleOutlineIcon />, toggler: toggleRead},
    {active: "Remove from Wishlist", inactive: "Add to Wishlist", status: state.wishlist, icon_active: <BookmarkIcon />, icon_inactive: <BookmarkBorderIcon />, toggler: toggleRead},
    {active: "Unfavourite", inactive: "Add to Favs", status: state.fav, icon_active: <FavoriteIcon />, icon_inactive: <FavoriteBorderIcon />, toggler: toggleRead}
  ]

  return (
    <Paper>
      <h1>{props.title}</h1>
      <h2>Userid: {props.userId}</h2>
      <h4>{props.authors &&
        props.authors.map((author) => author.name + " - ")} {props.year}</h4>
      <Paper className={classes.root}>
        {userFlags.map((f, index) => (
          <Chip
            key={index}
            onClick={f.toggler}
            label={f.status ? f.active : f.inactive}
            icon={f.status ? f.icon_active : f.icon_inactive}
            className={classes.chip}
            color={(f.status) ? "primary" : "default"}
          />))}
      </Paper>
      <img src={props.img} />
    </Paper>
  )
}

export default BookTitleBar