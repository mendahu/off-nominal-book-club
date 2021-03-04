import axios from "axios";
import { useRouter } from "next/router";
import { ApiReading } from "../../types/api/apiTypes";

export const useReading = (reading: ApiReading) => {
  const router = useRouter();
  const { id, book, host, members, milestones } = reading;

  const deleteReading = async () => {
    return axios
      .delete(`/api/readings/${id}/delete`)
      .then((res) => {
        return router.push(`/books/${book.id}`);
      })
      .catch((err) => {
        throw err;
      });
  };

  return {
    book,
    host,
    members,
    milestones,
    deleteReading,
  };
};
