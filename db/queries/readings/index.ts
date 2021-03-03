import knex from "../../knex";

export const createReading = (bookId: string, userId: number) => {
  type ReadingData = {
    book_id: string;
    user_id: number;
  };
  const readingData: ReadingData = {
    book_id: bookId,
    user_id: userId,
  };

  return knex<ReadingData, string>("readings")
    .insert<string>(readingData)
    .returning<string>("id");
};

export const deleteReading = (readingId: string) => {
  return knex<string, string>("readings").where("id", readingId).del<string>();
};

export const validateReadingOwner = (readingId: string, userId: number) => {
  return knex("readings").where({
    id: readingId,
    user_id: userId,
  });
};

export const fetchReading = (readingId: string) => {
  return knex("readings").select("user_id", "book_id").where("id", readingId);
};
