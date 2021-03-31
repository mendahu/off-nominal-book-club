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
  const [milestoneLoading, setMilestoneLoading] = useState(false);

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

  const addMilestone = (label: string, date: string) => {
    setMilestoneLoading(true);
    return axios
      .post(`/api/readings/${readingId}/milestones/new`, { label, date })
      .then((res) => {
        const data = {
          label,
          date,
          id: res.data,
        };
        return dispatch({
          type: ReadingsActionType.ADD_MILESTONE,
          payload: {
            milestonePayload: data,
          },
        });
      })
      .catch((err) => {
        throw err;
      })
      .finally(() => {
        return setMilestoneLoading(false);
      });
  };

  const removeMilestone = (milestoneId: string) => {
    return axios
      .delete(`/api/readings/${readingId}/milestones/delete`, {
        data: { milestoneId },
      })
      .then((res) => {
        return dispatch({
          type: ReadingsActionType.REMOVE_MILESTONE,
          payload: {
            milestoneId: res.data,
          },
        });
      })
      .catch((err) => {
        throw err;
      });
  };

  const editMilestone = (milestoneId: string, label: string, date: string) => {
    return axios
      .put(`/api/readings/${readingId}/milestones/${milestoneId}`)
      .then(() => {})
      .catch((err) => {
        throw err;
      })
      .finally(() => {});
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
    milestones: {
      list: milestones,
      add: addMilestone,
      remove: removeMilestone,
      edit: editMilestone,
      loading: milestoneLoading,
    },
    deleteReading,
    joinReading,
    leaveReading,
  };
};
