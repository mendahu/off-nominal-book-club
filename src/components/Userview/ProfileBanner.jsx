import { Grid, Typography, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider
} from "@material-ui/core/styles";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey["900"],
    backgroundImage:
      "url('https://www.transparenttextures.com/patterns/light-paper-fibers.png')",
    display: "flex",
    flexDirection: "row",
    height: "15vh"
  },
  avatar: {
    width: "10vh",
    height: "10vh",
    margin: "auto"
    // padding: theme.spacing(3, 3, 3, 3)
  },
  name: {
    fontSize: "3vh"
  },
  bio: {
    fontSize: "1vh",
    margin: "auto"
  },
  imageContainer: {
    postion: "absolute",
    alignSelf: "flex-start",
    display: "flex",
    height: "100%",
    width: "25%"
  },
  profileTextContainer: {
    height: "100%",
    width: "75%",
    alignSelf: "flex-end",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }
}));
export default function ProfileBanner(props) {
  const classes = useStyles();
  return (
    <Grid className={classes.root}>
      <Grid item className={classes.imageContainer}>
        <Avatar
          className={classes.avatar}
          alt={props.user.name}
          src={props.user.avatar_url}
        />
      </Grid>
      <ThemeProvider theme={theme}>
        <Grid item className={classes.profileTextContainer}>
          <Typography className={classes.name}>{props.user.name}</Typography>
          <Typography
            className={classes.name.bio}
            variant='h6'
            color='textSecondary'>
            {props.user.bio}
          </Typography>
        </Grid>
      </ThemeProvider>
    </Grid>
  );
}
