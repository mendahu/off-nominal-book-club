import {
  Card,
  CardContent,
  Typography,
  Avatar,
  CardMedia
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    diplay: "flex",
    flexDirection: "row"
  },
  container: {
    height: "10vh",
    display: "flex",
    flexDirection: "column",
    width: "75%"
  },
  avatar: {
    width: "10vh",
    height: "10vh",
    margin: "auto"
  },
  name: {
    fontSize: "3vh",
    margin: "auto"
  },
  bio: {
    fontSize: "1vh",
    margin: "auto"
  },
  image_container: {
    display: "flex",
    width: "25%"
  }
});
export default function ProfileBanner(props) {
  console.log(props);
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardMedia className={classes.image_container}>
        <Avatar
          className={classes.avatar}
          alt={props.user.name}
          src={props.user.avatar_url}
        />
      </CardMedia>
      <CardContent className={classes.container}>
        <Typography className={classes.name}>{props.user.name}</Typography>
        <Typography
          className={classes.name.bio}
          variant='subtitle1'
          color='textSecondary'>
          {props.user.bio}
        </Typography>
      </CardContent>
    </Card>
  );
}
