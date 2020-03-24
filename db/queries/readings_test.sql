-- Get users info
select users.id, users.name, users.avatar_url
from users
  join users_readings on user_id = users.id
where reading_id = 1


-- Get book info
SELECT b.id, b.title, authors, date_started, date_ended
FROM books b
  LEFT JOIN (
   SELECT book_id, json_agg(name) AS authors
  FROM authors a
    JOIN books_authors ba ON a.id = ba.author_id
    JOIN books AS b ON ba.book_id = b.id
  GROUP BY book_id
  ) AS author_names ON author_names.book_id = b.id
  JOIN readings ON readings.book_id = b.id
where readings.id = 1

SELECT users.id, users.name, users.avatar_url, comment
FROM users
  JOIN readings_comments on user_id = users.id
WHERE reading_id = 1;

-- GET new book info 

SELECT books.id, books.title, authors, books.year, books.image_url
FROM books
  LEFT JOIN (
            SELECT book_id, json_agg(name) AS authors
  FROM authors a
    JOIN books_authors ba ON a.id = ba.author_id
  GROUP BY book_id
            ) AS author_names ON author_names.book_id = books.id
WHERE books.id = 55;


-- GET all readings where not user
SELECT readings.id, max(books.title) as title, max(books.image_url), max(readings.user_count)
FROM books
  JOIN (
  SELECT readings.id as id, readings.book_id as book_id, COUNT(*) as user_count
  FROM readings
    JOIN users_readings on readings.id = users_readings.reading_id
  GROUP BY readings.id) as readings on readings.book_id = books.id
  JOIN (
  SELECT reading_id, array_agg(user_id) as users_array
  from users_readings
  GROUP BY reading_id
) as users on readings.id = users.reading_id
WHERE NOT (2 = ANY(users.users_array)
)
GROUP BY readings.id

-- GET all readings where user

SELECT readings.id, max(books.title), max(books.image_url), max(readings.user_count)
FROM books
  JOIN (
  SELECT readings.id as id, readings.book_id as book_id, COUNT(*) as user_count
  FROM readings
    JOIN users_readings on readings.id = users_readings.reading_id
  GROUP BY readings.id) as readings on readings.book_id = books.id
  JOIN (
  SELECT reading_id, array_agg(user_id) as users_array
  from users_readings
  GROUP BY reading_id
) as users on readings.id = users.reading_id
WHERE (2 = ANY(users.users_array)
)
GROUP BY readings.id





