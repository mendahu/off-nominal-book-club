import knex from "../../knex";

export const createReading = (bookId: string, userId: string) => {
  type ReadingData = {
    book_id: string;
    user_id: string;
  };
  const readingData: ReadingData = {
    book_id: bookId,
    user_id: userId,
  };

  return knex<ReadingData, string>("readings")
    .insert<string>(readingData)
    .returning<string>("id");
};
