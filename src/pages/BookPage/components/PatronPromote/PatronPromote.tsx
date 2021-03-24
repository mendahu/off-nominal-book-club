import {
  Grid,
  Paper,
  Button,
  Typography,
  CardContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2, 2, 2, 2),
  },
}));

const PatronPromote = (props) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={4}>
      <Paper>
        <CardContent className={classes.header}>
          <Typography component="h2" variant="h5">
            Subscribe for more!
          </Typography>
        </CardContent>

        <CardContent>
          <Typography
            component="p"
            color="textSecondary"
            variant="body2"
            paragraph
          >
            Patron users can add tags, rate and review books, create Readings
            with friends, and more!
          </Typography>
          <Link href={`/users/${props.userId}`} passHref>
            <Button variant="contained" color="primary" component="a">
              Connect your Account
            </Button>
          </Link>
        </CardContent>
      </Paper>
    </Grid>
  );
};

export default PatronPromote;
