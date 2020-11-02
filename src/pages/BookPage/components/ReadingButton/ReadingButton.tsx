import {
  Grid,
  Paper,
  Button,
  Typography,
  CardContent
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";

const useStyles = makeStyles(theme => ({
  header: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2, 2, 2, 2)
  }
}));

const ReadingButton = props => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={4}>
      <Paper>
        <CardContent className={classes.header}>
          <Typography component='h2' variant='h5'>
            Read with Friends!
          </Typography>
        </CardContent>

        <CardContent>
          <Typography
            component='p'
            color='textSecondary'
            variant='body2'
            paragraph>
            Schedule a reading and get friends to join. You'll have a space to
            discuss the book as you read it!
          </Typography>
          <Link
            href={`/readings/new/[id]`}
            as={`/readings/new/${props.bookId}`}
            passHref>
            <Button variant='contained' color='primary' component='a'>
              Start a Reading
            </Button>
          </Link>
        </CardContent>
      </Paper>
    </Grid>
  );
};

export default ReadingButton;
