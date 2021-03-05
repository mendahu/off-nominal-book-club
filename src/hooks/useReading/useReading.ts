import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ApiReading } from "../../types/api/apiTypes";

export const useReading = (readingId: string) => {
  const router = useRouter();
  const [loadingReading, setLoadingReading] = useState(true);
  const [book, setBook] = useState(null);
  const [host, setHost] = useState(null);
  const [members, setMembers] = useState(null);
  const [milestones, setMilestones] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/readings/${readingId}`)
      .then((res) => {
        const { book, host, members, milestones } = res.data;
        setBook(book);
        setHost(host);
        setMembers(members);
        setMilestones(milestones);
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
