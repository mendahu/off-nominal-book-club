import Layout from "../../src/components/DefaultLayout";
import {
  useSnackbar,
  OnbcSnackbar,
} from "../../src/hooks/useSnackbar/useSnackbar";
import SnackbarContext from "../../src/contexts/SnackbarContext";
import { useBookClubUser } from "../../lib/bookClubUser";
import { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Typography } from "@material-ui/core";
import LayoutComponent from "../../src/components/General/LayoutComponent";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
}));

const ReadingsPage = () => {
  const { user, loading } = useBookClubUser();
  const { snackBarContent, triggerSnackbar, closeSnackbar } = useSnackbar();
  const [readingsLoading, setReadingsLoading] = useState(true);
  const [readings, setReadings] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    axios.get("api/readings/").then((res) => {
      setReadings(res.data);
      setReadingsLoading(false);
    });
  });

  const generateReadingsList = (readings) => {
    return (
      <>
        {readings.map((reading) => (
          <LayoutComponent xs={12} key={reading.id}>
            <h1>{reading.book_id}</h1>
          </LayoutComponent>
        ))}
      </>
    );
  };

  return (
    <Layout>
      <SnackbarContext.Provider value={triggerSnackbar}>
        <Grid container spacing={2} className={classes.container}>
          <LayoutComponent xs={12}>
            <Typography component="h1" variant="h4">
              Readings
            </Typography>
          </LayoutComponent>
          {generateReadingsList(readings)}
        </Grid>
        <OnbcSnackbar content={snackBarContent} closeSnackbar={closeSnackbar} />
      </SnackbarContext.Provider>
    </Layout>
  );
};

export default ReadingsPage;
