import { useState } from "react";
import { 
  Chip,
  Card,
  CardContent,
  Box,
  Typography } from "@material-ui/core";
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
    margin: theme.spacing(1, 0),
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const BookTitleBar = (props) => {

  const classes = useStyles();
  
  const [userData, setUserData ] = useState({
    reads: {
      user: props.userRead,
      community: props.reads - (props.userRead ? 1 : 0)
    },
    favourites: {
      user: props.userFav,
      community: props.favs - (props.userFav ? 1 : 0)
    },
    wishlist: {
      user: props.userWishlist,
      community: props.wishes - (props.userWishlist ? 1 : 0)
    },
  })

  const userBook = {
    bookId: props.bookId,
    userId: props.userId,
  }

  const toggleData = (dataType) => {
    (userData[dataType].user) 
      ? axios.delete(`/api/${dataType}/${userData[dataType].user}`)
        .then(() => setUserData({
          ...userData, 
          [dataType]: { user: false, community: userData[dataType].community-- }
        }))
        .catch(err => console.log(err))
      : axios.post(`/api/${dataType}/new`, userBook)
        .then(res => setUserData({
          ...userData, 
          [dataType]: { user: res.data[0], community: userData[dataType].community++ }
        }))
        .catch(err => console.log(err))
  }

  const userFlags = [
    {
      type: "reads", 
      count: userData.reads.community + (userData.reads.user ? 1 : 0),
      status: userData.reads.user, 
      icon_active: <CheckCircleIcon />, 
      icon_inactive: <CheckCircleOutlineIcon />
    },
    {
      type: "wishlist", 
      count: userData.wishlist.community + (userData.wishlist.user ? 1 : 0), 
      status: userData.wishlist.user, 
      icon_active: <BookmarkIcon />, 
      icon_inactive: <BookmarkBorderIcon />
    },
    {
      type: "favourites", 
      count: userData.favourites.community + (userData.favourites.user ? 1 : 0), 
      status: userData.favourites.user, 
      icon_active: <FavoriteIcon />, 
      icon_inactive: <FavoriteBorderIcon />}
  ]

  const authorString = props.authors 
    ? props.authors.map(author => author.name).join(", ")
    : 'Author Unknown' 

  return (
    <Card className={classes.root}>

      <img src={props.img} />

      <CardContent>
        <h4>{props.rating || "-"}</h4>
        {userFlags.map((f, index) => (
          <Chip
          key={index}
          onClick={() => toggleData(f.type)}
          label={f.count}
          icon={f.status ? f.icon_active : f.icon_inactive}
          className={classes.chip}
          color={(f.status) ? "primary" : "default"}
          />))}
      </CardContent>

      <CardContent>  
        <h1>{props.title}</h1>
        <h4>{authorString} - {props.year}</h4>
      </CardContent>

    </Card>
  )
}

export default BookTitleBar