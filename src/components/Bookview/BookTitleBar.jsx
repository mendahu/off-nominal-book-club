import { useState } from "react";
import { 
  Chip,
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
import axios from 'axios'

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1, 0, 0, 0 ),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: "space-between"
  },
  chip: {
    margin: theme.spacing(0.5),
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
      ? axios.delete(`/api/${dataType}/${userData[dataType].user}/delete`)
        .then(() => setUserData({
          ...userData, 
          [dataType]: { user: false, community: userData[dataType].community-- }
        }))
        .catch(err => console.errror(err))
      : axios.post(`/api/${dataType}/new`, userBook)
        .then(res => setUserData({
          ...userData, 
          [dataType]: { user: res.data[0], community: userData[dataType].community++ }
        }))
        .catch(err => console.error(err))
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

          {userFlags.map((f, index) => (
            <Box key={index} className={classes.stat}>
              <Chip
                onClick={() => props.userId ? toggleData(f.type) : alert("You must be logged in to mark books as read, add to wishlist, or favourite.")}
                label={f.count}
                icon={f.status ? f.icon_active : f.icon_inactive}
                className={classes.chip}
                color={(f.status) ? "primary" : "default"}
              />
            </Box>
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