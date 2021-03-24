import Layout from "../../src/components/DefaultLayout";
import { useSnackbarContext } from "../../src/contexts/SnackbarContext";
import { useBookClubUser } from "../../lib/bookClubUser";
import { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Typography } from "@material-ui/core";
import LayoutComponent from "../../src/components/General/LayoutComponent";
import { makeStyles } from "@material-ui/core/styles";
import ReadingListItem from "../../src/pages/ReadingsPage/ReadingListItem/ReadingListItem";
import generateAuthorString from "../../src/helpers/generateAuthorString";
import { ApiReading } from "../../src/types/api/apiTypes";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
}));

const ReadingsPage = () => {
  const { user, loading } = useBookClubUser();
  const triggerSnackbar = useSnackbarContext();
  const [readingsLoading, setReadingsLoading] = useState(true);
  const [readings, setReadings] = useState<ApiReading[]>([]);
  const classes = useStyles();

  useEffect(() => {
    axios.get<ApiReading[]>("api/readings/").then((res) => {
      setReadings(res.data);
      setReadingsLoading(false);
    });
  }, []);

  const generateReadingsList = (readings: ApiReading[]) => {
    console.log(readings);
    return (
      <>
        {readings.map((reading) => (
          <ReadingListItem
            key={reading.id}
            bookId={reading.book.id}
            bookTitle={reading.book.title}
            googleId={reading.book.google_id}
            readingId={reading.id}
            authorString={generateAuthorString(reading.book.authors)}
            hostName={reading.host.name}
            hostAvatar={reading.host.avatar}
          />
        ))}
      </>
    );
  };

  return (
    <Layout>
      <Grid container spacing={2} className={classes.container}>
        <LayoutComponent xs={12}>
          <Typography component="h1" variant="h4">
            Readings
          </Typography>
        </LayoutComponent>
        {generateReadingsList(readings)}
      </Grid>
    </Layout>
  );
};

export default ReadingsPage;
