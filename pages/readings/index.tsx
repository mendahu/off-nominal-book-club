import Layout from "../../src/components/DefaultLayout";
import {
  useSnackbar,
  OnbcSnackbar,
} from "../../src/hooks/useSnackbar/useSnackbar";
import SnackbarContext from "../../src/contexts/SnackbarContext";
import { useBookClubUser } from "../../lib/bookClubUser";
import { useEffect, useState } from "react";
import axios from "axios";

const ReadingsPage = () => {
  const { user, loading } = useBookClubUser();
  const { snackBarContent, triggerSnackbar, closeSnackbar } = useSnackbar();
  const [readings, setReadings] = useState([]);

  useEffect(() => {
    axios.get("api/readings/").then((res) => {
      setReadings(res.data);
    });
  });

  return (
    <Layout>
      <SnackbarContext.Provider value={triggerSnackbar}>
        {readings.map((reading) => (
          <h1>{reading.book_id}</h1>
        ))}
        <OnbcSnackbar content={snackBarContent} closeSnackbar={closeSnackbar} />
      </SnackbarContext.Provider>
    </Layout>
  );
};

export default ReadingsPage;
