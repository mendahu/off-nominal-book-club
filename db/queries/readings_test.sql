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
