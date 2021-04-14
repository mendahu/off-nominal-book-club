import knex from "../../knex";

export const createReading = async (bookId: string, userId: number) => {
  type ReadingData = {
    book_id: string;
    user_id: number;
  };

  const readingData: ReadingData = {
    book_id: bookId,
    user_id: userId,
  };

  let readings: string[];

  // Create empty reading in db, return reading ID for subsequent functions
  try {
    readings = await knex<ReadingData, string>("readings")
      .insert<string>(readingData)
      .returning<string[]>("id");
  } catch (err) {
    throw err;
  }

  const [readingId] = readings;

  type MembershipData = {
    reading_id: string;
    user_id: number;
  };

  const membershipData = {
    reading_id: readingId,
    user_id: userId,
  };

  const promises = [];

  // Adds creator as a member of a reading
  promises.push(
    knex<MembershipData, string>("users_readings")
      .insert<string>(membershipData)
      .returning<string>("reading_id")
  );

  // Adds default milestones to a reading
  promises.push(
    knex.raw(
      `
      INSERT INTO readings_milestones (readings_id, date, label) VALUES 
        (?, now() + interval '7 day', 'Start Reading!'),
        (?, now() + interval '14 day', 'Discuss Chapter 1.'),
        (?, now() + interval '21 day', 'Reading finished.')
    `,
      [readingId, readingId, readingId]
    )
  );

  return Promise.all(promises)
    .then(() => {
      return readingId;
    })
    .catch((err) => {
      //Delete the reading in case of an error. Cascade rules should clear any milestones and memberships.
      knex("readings").where("id", readingId).del();
      throw err;
    });
};

export const deleteReading = (readingId: string) => {
  return knex<string, string>("readings").where("id", readingId).del<string>();
};

export const updateReading = (
  readingId: { description: string },
  readingOptions: string
) => {
  return knex<string, { description: string }>("readings")
    .where("id", readingId)
    .update(readingOptions);
};

export const validateReadingOwner = (readingId: string, userId: number) => {
  return knex("readings").where({
    id: readingId,
    user_id: userId,
  });
};

export const joinReading = (reading_id: string, user_id: number) => {
  type ReadingData = { reading_id: string; user_id: number };
  const readingData: ReadingData = { reading_id, user_id };

  return knex<ReadingData, string>("users_readings")
    .insert(readingData)
    .returning<string>("user_id");
};

export const leaveReading = (reading_id: string, user_id: number) => {
  return knex<string, string>("users_readings")
    .where("reading_id", reading_id)
    .andWhere("user_id", user_id)
    .del(["user_id"]);
};

export const fetchReading = (readingId: string) => {
  return knex.raw(
    `
    SELECT 
    readings.id, 
    readings.description,
    ( SELECT row_to_json(books) 
      FROM (
        SELECT 
          id, 
          title,
          google_id,
          ( SELECT json_agg(authors) 
            FROM (
              SELECT name 
              FROM authors
              JOIN books_authors ON authors.id = books_authors.author_id
              WHERE books_authors.book_id = books.id
            ) authors
          ) AS authors
        FROM books
        WHERE books.id = readings.book_id
      ) AS books
    ) AS book,
    ( SELECT row_to_json(users)
      FROM (
        SELECT id, name, CASE WHEN avatar_select='patreon' THEN patreon_avatar_url ELSE gravatar_avatar_url END as avatar
        FROM users
        WHERE id = readings.user_id
      ) users
    ) AS host,
    ( SELECT json_agg(member) 
      FROM (
        SELECT users.id, name, CASE WHEN avatar_select='patreon' THEN patreon_avatar_url ELSE gravatar_avatar_url END as avatar
        FROM users
        JOIN users_readings ON users.id = users_readings.user_id
        WHERE users_readings.reading_id = readings.id
      ) AS member 
    ) AS members,
    ( SELECT json_agg(milestone) 
      FROM (
        SELECT readings_milestones.id, readings_milestones.date, readings_milestones.label
        FROM readings_milestones
        WHERE readings_milestones.readings_id = readings.id
        ORDER BY readings_milestones.date
      ) AS milestone 
    ) AS milestones
  FROM readings
  WHERE readings.id = ?
    `,
    readingId
  );
};

export const fetchAllReadings = () => {
  return knex.raw(
    `
      SELECT 
        readings.id,
        readings.description,
        (
          SELECT row_to_json(users)
          FROM (
            SELECT id, name, CASE WHEN avatar_select='patreon' THEN patreon_avatar_url ELSE gravatar_avatar_url END as avatar
            FROM users
            WHERE id = readings.user_id
          ) users
        ) as host,
        (
          SELECT row_to_json(book)
          FROM (
            SELECT
              books.id,
              books.title,
              books.google_id,
              ( SELECT json_agg(authors) 
              FROM (
                SELECT name 
                FROM authors
                JOIN books_authors ON authors.id = books_authors.author_id
                WHERE books_authors.book_id = books.id
              ) authors
            ) AS authors
            FROM books
            WHERE books.id = readings.book_id
          ) as book
        ) as book
      FROM readings
    `
  );
};
