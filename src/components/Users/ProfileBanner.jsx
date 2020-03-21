import { Card, CardContent, Typography, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    diplay: "flex",
    flexDirection: "column"
  },
  container: {
    height: "15vh",
    display: "flex"
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
  }
});
export default function ProfileBanner(props) {
  console.log(props);
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent className={classes.container}>
        <Avatar
          className={classes.avatar}
          alt={props.user.name}
          src={props.user.avatar_url}
        />
      </CardContent>
      <CardContent className={classes.container}>
        <Typography className={classes.name}>{props.user.name}</Typography>
      </CardContent>
      <CardContent className={classes.container}>
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
