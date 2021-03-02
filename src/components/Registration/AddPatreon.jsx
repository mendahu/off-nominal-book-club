import { Typography, Button, Grid, Paper } from "@material-ui/core";
import patreonAuthUrlGenerator from "../../../src/helpers/patreon/authUrlGenerator";
import ForwardIcon from "@material-ui/icons/Forward";
import Launch from "@material-ui/icons/Launch";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  centred: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  root: {
    padding: theme.spacing(4),
    marginTop: theme.spacing(4),
    maxWidth: "640px",
  },
  button: {
    margin: theme.spacing(2, 0, 0, 0),
  },
  patreonWordMark: {
    display: "block",
    width: "100%",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  topSpace: {
    marginTop: theme.spacing(10),
  },
  paragraphSpace: {
    marginTop: theme.spacing(2),
  },
  centredText: {
    textAlign: "center",
  },
}));

export default function AddPatreon({ skipProfile }) {
  const classes = useStyles();

  const handleSkip = () => {
    axios.post("/api/auth/update", { result: "skipped" });
    skipProfile();
  };

  return (
    <Paper className={clsx(classes.root, classes.centred)}>
      <img
        src="/Patreon_White.png"
        alt="Patreon Logo"
        className={clsx(classes.patreonWordMark, classes.centred)}
      />

      <Typography variant="body1">
        Patrons of the WeMartians Podcast and Main Engine Cut Off Podcast have
        special privileges at the Off-Nominal Book Club. All Patrons can:
      </Typography>
      <ul>
        <Typography variant="body1" component="li">
          Add books to the collection
        </Typography>
        <Typography variant="body1" component="li">
          Rate books
        </Typography>
        <Typography variant="body1" component="li">
          Review books
        </Typography>
      </ul>

      <Typography
        variant="h5"
        component="p"
        align="center"
        className={classes.topSpace}
      >
        Already a patron?
      </Typography>
      <div className={classes.centredText}>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          href={patreonAuthUrlGenerator()}
          endIcon={<Launch />}
        >
          Connect Patreon
        </Button>
      </div>

      <Typography variant="h5" paragraph className={classes.topSpace}>
        Not a patron?
      </Typography>
      <Typography variant="body1" paragraph>
        Consider supporting us for as little as $1/month. Not only do you get
        access to the premium features of Off-Nominal Book Club, but you support
        two independent content creators helping tell the story of space
        exploration. Patrons get many other perks as well!
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} className={classes.centredText}>
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            href={"http://www.wemartians.com/support"}
            endIcon={<Launch />}
          >
            Support WeMartians
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.centredText}>
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            href={"http://www.mainenginecutoff.com/support"}
            endIcon={<Launch />}
          >
            Support MECO
          </Button>
        </Grid>
      </Grid>

      <Button
        className={clsx(classes.button, classes.topSpace)}
        endIcon={<ForwardIcon />}
        variant="contained"
        color="default"
        onClick={handleSkip}
      >
        Skip for now
      </Button>
      <Typography
        variant="caption"
        component="p"
        className={classes.paragraphSpace}
      >
        Don't worry - free users can still browse the collection, mark books as
        read or favourites, and create wishlists.
      </Typography>
    </Paper>
  );
}
