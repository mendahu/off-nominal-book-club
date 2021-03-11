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
  const [membershipLoading, setMembershipLoading] = useState(false);

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

  const joinReading = async () => {
    setMembershipLoading(true);
    axios
      .post(`/api/readings/${readingId}/join`)
      .then((res) => {
        return dispatch({
          type: ReadingsActionType.JOIN_READING,
          payload: { joinPayload: res.data },
        });
      })
      .catch((err) => {
        throw err;
      })
      .finally(() => {
        return setMembershipLoading(false);
      });
  };

  const leaveReading = async () => {
    setMembershipLoading(true);
    axios
      .delete(`/api/readings/${readingId}/leave`)
      .then((res) => {
        return dispatch({
          type: ReadingsActionType.LEAVE_READING,
          payload: {
            userId: res.data.user_id,
          },
        });
      })
      .catch((err) => {
        throw err;
      })
      .finally(() => {
        return setMembershipLoading(false);
      });
  };

  const { book, host, members, milestones } = state;

  return {
    loadingReading,
    error,
    book,
    host,
    membership: {
      list: members,
      join: joinReading,
      leave: leaveReading,
      loading: membershipLoading,
    },
    milestones,
    deleteReading,
    joinReading,
    leaveReading,
  };
};
