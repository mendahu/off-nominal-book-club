import axios from "axios";
import { ApiReading } from "../../types/api/apiTypes";

export const useReading = (reading: ApiReading) => {
  const { id, book, host, members, milestones } = reading;

  const deleteReading = async () => {
    return await axios.delete(`/api/readings/${id}`);
  };

  return {
    book,
    host,
    members,
    milestones,
    deleteReading,
  };
};
