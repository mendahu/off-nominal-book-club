
SELECT
  b.id,
  STRING_AGG (
   a.name::character
varying, ',') authors
FROM
  books b
INNER JOIN books_authors ba ON b.id = ba.book_id 
INNER JOIN authors a ON ba.author_id = a.id
GROUP BY
    b.id



select "books"."id", "books"."title", "books"."fiction", "books"."google_id", "books"."isbn13", "books"."description", "books"."year", "books"."image_url", ( SELECT STRING_AGG ( a.name::character varying, ',') as authors
  FROM books b INNER JOIN books_authors ba ON b.id = ba.book_id INNER JOIN authors a ON ba.author_id = a.id
  WHERE b.id = books.id ) AS authorstring, ( SELECT json_agg(authors)
  FROM ( SELECT name
    FROM authors JOIN books_authors ON authors.id = books_authors.author_id
    WHERE books_authors.book_id = books.id ) authors ) AS authors, ( SELECT json_agg(tag)
  FROM ( SELECT name AS tag_name, COUNT('user_tag_book.id') as count
    FROM tags JOIN user_tag_book ON tags.id = user_tag_book.tag_id JOIN books as b ON user_tag_book.book_id = books.id
    WHERE b.id = books.id
    GROUP BY name
    ORDER BY count DESC ) tag ) AS tags
from "books"
where LOWER("title") LIKE '%cake%' or LOWER("description") LIKE '%%' or LOWER("year") LIKE '%%' or LOWER("authorstring") LIKE '%%'




select
  b.id as book_id,
  json_agg(author_names.author_name) as author_names,
  string_agg(author_names.author_name::character
varying, ',') as author_string,
  json_agg
(tag_counts) as tags,
  string_agg
(tag_counts.tag_name::character varying, ',') as tag_string,
  b.title
from books b
  JOIN
(
    SELECT book_id, name as author_name
FROM authors a
  JOIN books_authors ba ON a.id = ba.author_id
  JOIN books as b on ba.book_id = b.id
GROUP BY a.name, book_id
  )
as author_names on author_names.book_id = b.id

  JOIN
(
    SELECT book_id, name AS tag_name, COUNT('user_tag_book.id') as count
FROM tags t
  JOIN user_tag_book utb ON t.id = utb.tag_id
  JOIN books as b ON utb.book_id = b.id
GROUP BY t.name, book_id
ORDER BY count DESC
) as tag_counts on tag_counts.book_id = b.id
where b.id = 9
group by b.id
order by tag_counts.count desc