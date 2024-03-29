import {
  Grid,
  Paper,
  Button,
  Typography,
  CardContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSnackbarContext } from "../../../../contexts/SnackbarContext";
import NewReadingDialog from "./NewReadingDialog/NewReadingDialog";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2, 2, 2, 2),
  },
}));

export type ReadingButtonProps = {
  bookId: string;
};

const ReadingButton = (props) => {
  const router = useRouter();
  const classes = useStyles();
  const triggerSnackbar = useSnackbarContext();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const createReading = () => {
    setLoading(true);
    axios
      .post("/api/readings/new", { bookId: props.bookId })
      .then((res) => {
        router.push(`/readings/${res.data}`);
      })
      .catch((err) => {
        triggerSnackbar({
          active: true,
          severity: "error",
          message: "Failed to create Reading",
        });
      });
  };

  return (
    <Grid item xs={12} sm={4}>
      <Paper>
        <CardContent className={classes.header}>
          <Typography component="h2" variant="h5">
            Read with Friends!
          </Typography>
        </CardContent>

        <CardContent>
          <Typography
            component="p"
            color="textSecondary"
            variant="body2"
            paragraph
          >
            Schedule a reading and get friends to join. You'll have a space to
            discuss the book as you read it!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsOpen(true)}
          >
            Start a Reading
          </Button>
        </CardContent>
        <NewReadingDialog
          isOpen={isOpen}
          close={() => setIsOpen(false)}
          createReading={createReading}
          loading={loading}
        />
      </Paper>
    </Grid>
  );
};

export default ReadingButton;
