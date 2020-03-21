




booktitle, author_array, bookx booky bookz, {'space': 3, 'planets': 2}

booktitle, author_array, bookx booky bookz, ['space', 'planets', 'space', 'space', 'planets']







select authorstring, authors, title, 
from (
  select array_agg(authors) as authors
  -- select to create fake table
)
where title like '%%'
  or where description like '%%'
  or where authorstring like '%%'



select
  b.id as book_id,
  array_agg(a.name) as author_names,
  string_agg(a.name::character varying, ',') as author_string,
  b.title
from books b
  join books_authors ba on ba.book_id = b.id
  join authors a on ba.author_id = a.id
where b.title
ilike '%cake%'
group by b.id
;


-- missing counts
select
  b.id as book_id,
  a.name,
  json_agg(a.name) as author_names,
  string_agg(a.name::character varying, ',') as author_string,
  json_agg(tag_counts) as tags,
  string_agg(tag_counts.tag_name::character varying, ',') as tag_string,
  b.title
from books b
  join books_authors ba on ba.book_id = b.id 
  join authors a on ba.author_id = a.id
  JOIN (
    SELECT book_id, name AS tag_name, COUNT('user_tag_book.id') as count
            FROM tags t
              JOIN user_tag_book utb ON t.id = utb.tag_id
              JOIN books as b ON utb.book_id = b.id
            GROUP BY t.name, book_id
            ORDER BY count DESC
  ) as tag_counts on tag_counts.book_id = b.id
where b.id = 9
group by b.id, a.name
;


-- tags and counts as table
 SELECT name AS tag_name, COUNT('user_tag_book.id') as count 
            FROM tags
              JOIN user_tag_book ON tags.id = user_tag_book.tag_id
              JOIN books as b ON user_tag_book.book_id = b.id
            WHERE b.id = 55
            GROUP BY name
            ORDER BY count DESC

-- tags and counts as JSON
SELECT json_agg(tag)
  FROM (
    SELECT name AS tag_name, COUNT('user_tag_book.id') as count 
            FROM tags
              JOIN user_tag_book ON tags.id = user_tag_book.tag_id
              JOIN books as b ON user_tag_book.book_id = b.id
            WHERE b.id = 55
            GROUP BY name
            ORDER BY count DESC
  ) as tag




select
  b.id as book_id,
  array_agg(a.name) as author_names,
  b.title
from books b
  join books_authors ba on ba.book_id = b.id
  join authors a on ba.author_id = a.id
  join (
    select book_id, tag_name, count(*) as num
  from
    user_book_tags join tags on blahblah
  group by book_id, tag_name
  ) as tag_counts on tag_counts.book_id = b.id
  JOIN user_tag_book utb ON utb.book_id = b.id
  JOIN tags ON tags.id = utb.tag_id
where b.title ilike '%cake%'
  or a.name
ilike '%an%'
group by b.id




SELECT name AS tag_name, COUNT('user_tag_book.id') as count 
            FROM tags
              JOIN user_tag_book ON tags.id = user_tag_book.tag_id
              JOIN books as b ON user_tag_book.book_id = b.id
            WHERE b.id = 5
            GROUP BY name
            ORDER BY count DESC;




-- GET TAGS AND COUNT 
SELECT name AS tag_name, COUNT('user_tag_book.id') as count
            FROM tags
              JOIN user_tag_book ON tags.id = user_tag_book.tag_id
              JOIN books as b ON user_tag_book.book_id = b.id
            WHERE b.id = 5
            GROUP BY name
            ORDER BY count DESC;


-- GET JSON COUNT



select
  b.id as book_id,
  array_agg(a.name) as author_names,
  b.title
from books b
  join books_authors ba on ba.book_id = b.id
  join authors a on ba.author_id = a.id
  join (
    select book_id, tag_name, count(*) as num
  from
    user_book_tags join tags on blahblah
  group by book_id, tag_name
  ) as tag_counts on tag_counts.book_id = b.id
  JOIN user_tag_book utb ON utb.book_id = b.id
  JOIN tags ON tags.id = utb.tag_id
where b.title ilike '%cake%'
  or a.name
ilike '%an%'
group by b.id




-- no repeats
select
  b.id as book_id,
  json_agg(author_names.author_name) as author_names,
  string_agg(author_names.author_name::character varying, ',') as author_string,
  json_agg(tag_counts) as tags,
  string_agg(tag_counts.tag_name::character varying, ',') as tag_string,
  b.title
from books b
  JOIN (
    SELECT book_id, name as author_name
      FROM authors a
        JOIN books_authors ba ON a.id = ba.author_id
        JOIN books as b on ba.book_id = b.id
      GROUP BY a.name, book_id
  ) as author_names on author_names.book_id = b.id

  JOIN (
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



tag1   \               /  auth1
tag2   -     book      -  auth2
tag3   /               \  auth3


-- the solution!
SELECT
  b.id,
  b.title,
  b.fiction,
  b.google_id,
  b.isbn13,
  b.description,
  b.year,
  b.image_url,
  max(author_names.names) AS author_string,
  max(author_names.names_json::text) AS author_array,
  json_agg(tag_counts) AS tags,
  max(tag_counts.tag_name) as tags_name,
  max(tag_counts.names) AS tag_string,
  b.title
from books b
  LEFT JOIN (
    SELECT book_id, string_agg(name::character varying, ',') AS names, json_agg(name) AS names_json
      FROM authors a
        JOIN books_authors ba ON a.id = ba.author_id
        JOIN books AS b ON ba.book_id = b.id
      GROUP BY book_id
  ) as author_names ON author_names.book_id = b.id

  LEFT JOIN (
    SELECT book_id, string_agg(name::character varying, ',') AS names, name as tag_name, COUNT('user_tag_book.id') AS count
            FROM tags t
              JOIN user_tag_book utb ON t.id = utb.tag_id
              JOIN books AS b ON utb.book_id = b.id
            GROUP BY t.name, book_id
            ORDER BY count DESC
  ) AS tag_counts ON tag_counts.book_id = b.id
WHERE b.id = 55
  
GROUP BY b.id



-- AVERAGE RATING
  SELECT AVG(rating)
            FROM reviews
              JOIN ratings ON ratings.book_id = reviews.book_id
              WHERE reviews.book_id = 5







    
SELECT book_id, string_agg(tag_name::character varying, ',') as tag_string, json_agg(tag_counts) as tags
  FROM (
    SELECT book_id, name as tag_name, COUNT('user_tag_book.id') AS count
            FROM tags t
              JOIN user_tag_book utb ON t.id = utb.tag_id
              JOIN books AS b ON utb.book_id = b.id
            GROUP BY book_id, t.name
            ORDER BY count DESC) as tag_counts
            GROUP BY book_id


--  fixed SOLUTION (USE THIS)
SELECT
  b.id,
  b.title,
  b.fiction,
  b.google_id,
  b.isbn13,
  b.description,
  b.year,
  b.image_url,
  ratings.avg_rating as avg_rating
  max(author_names.names) AS author_string,
  max(author_names.names_json::text) AS author_array,
  max(tags_info.tags:: text) as tags,
  max(tags_info.tag_string) as tags_string

from books b
  LEFT JOIN (
    SELECT book_id, string_agg(name::character varying, ',') AS names, json_agg(name) AS names_json
      FROM authors a
        JOIN books_authors ba ON a.id = ba.author_id
        JOIN books AS b ON ba.book_id = b.id
      GROUP BY book_id
  ) as author_names ON author_names.book_id = b.id

  LEFT JOIN (
    SELECT book_id, string_agg(tag_name::character varying, ',') as tag_string, json_agg(tag_counts) as tags
      FROM (
        SELECT book_id, name as tag_name, COUNT('user_tag_book.id') AS count
            FROM tags t
              JOIN user_tag_book utb ON t.id = utb.tag_id
              JOIN books AS b ON utb.book_id = b.id
            GROUP BY book_id, t.name
            ORDER BY count DESC) as tag_counts
            GROUP BY book_id) as tags_info on tags_info.book_id = b.id
  LEFT JOIN (
    SELECT AVG(rating) as avg_rating
          FROM reviews
              JOIN ratings ON ratings.book_id = reviews.book_id) as ratings on ratings.book_id = b.id
WHERE b.id = 55
  
GROUP BY b.id




-- get all tags
SELECT tags.tag_name as tag_name, count(*) as count
  FROM (
  SELECT name AS tag_name, book_id
            FROM tags t
              JOIN user_tag_book utb ON t.id = utb.tag_id
              JOIN books AS b ON utb.book_id = b.id
            WHERE t.name ilike '%space%'
            GROUP BY tag_name, book_id
) AS tags
GROUP BY tag_name
ORDER BY count DESC


--  get books with tag
     SELECT
      b.id,
      b.title,
      b.fiction,
      b.google_id,
      b.isbn13,
      b.description,
      b.year,
      b.image_url,
      ROUND(max(ratings.avg_rating),1) as avg_rating,
      max(tags_info.tag_array),
      max(author_names.names) AS authors_string,
      max(author_names.names_json::text) AS authors,
      max(tags_info.tags:: text) as tags,
      max(tags_info.tag_string) as tags_string
    FROM books b
      LEFT JOIN (
        SELECT book_id, string_agg(name::character varying, ',') AS names, json_agg(name) AS names_json
          FROM authors a
            JOIN books_authors ba ON a.id = ba.author_id
            JOIN books AS b ON ba.book_id = b.id
          GROUP BY book_id
      ) as author_names ON author_names.book_id = b.id
      LEFT JOIN (
        SELECT book_id, array_agg(tag_name) as tag_array, string_agg(tag_name::character varying, ',') as tag_string, json_agg(tag_counts) as tags
          FROM (
            SELECT book_id, name as tag_name, COUNT('user_tag_book.id') AS count
                FROM tags t
                  JOIN user_tag_book utb ON t.id = utb.tag_id
                  JOIN books AS b ON utb.book_id = b.id
                GROUP BY book_id, t.name
                ORDER BY count DESC) as tag_counts
                GROUP BY book_id) as tags_info on tags_info.book_id = b.id
      LEFT JOIN (
        SELECT ratings.book_id, AVG(rating) as avg_rating
              FROM reviews
                  JOIN ratings ON ratings.book_id = reviews.book_id
                GROUP BY ratings.book_id) as ratings on ratings.book_id = b.id          
    GROUP BY b.id
    HAVING '${tag}' = ANY(max(tags_info.tag_array))


select b.id, b.title, authors, f.user_id
  FROM books b
  LEFT JOIN (
   SELECT book_id, json_agg(name) AS authors
          FROM authors a
            JOIN books_authors ba ON a.id = ba.author_id
            JOIN books AS b ON ba.book_id = b.id
          GROUP BY book_id
  ) as author_names on author_names.book_id = b.id
  JOIN favourites f on f.book_id = b.id
where f.user_id = 2




SELECT name, email, bio, avatar_url
  FROM users
  WHERE id = 2

select books.id, books.title, rating
  FROM books 
  JOIN ratings on book_id = books.id
  WHERE ratings.user_id = 2
