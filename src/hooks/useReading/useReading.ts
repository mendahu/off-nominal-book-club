import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useReducer, useState } from "react";
import {
  buildDefaultReadingsState,
  ReadingsActionType,
  readingsReducer,
} from "../../reducers/readingsReducer/readingsReducer";

export const useReading = (readingId: string) => {
  const router = useRouter();
  const [loadingReading, setLoadingReading] = useState(true);
  const [state, dispatch] = useReducer(
    readingsReducer,
    buildDefaultReadingsState(readingId)
  );
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/readings/${readingId}`)
      .then((res) => {
        dispatch({
          type: ReadingsActionType.LOAD_STATE,
          payload: { state: res.data },
        });
      })
      .catch((err) => {
        setError(true);
      })
      .finally(() => {
        setLoadingReading(false);
      });
  }, []);

  const deleteReading = async () => {
    return axios
      .delete(`/api/readings/${readingId}/delete`)
      .then((res) => {
        return router.push(`/books/${book.id}`);
      })
      .catch((err) => {
        throw err;
      });
  };

  const { book, host, members, milestones } = state;

  return {
    loadingReading,
    error,
    book,
    host,
    members,
    milestones,
    deleteReading,
  };
};
