

select
  b.id as book_id,
  a.id as author_id,
  a.name as author_name,
  b.title
from books b
  join books_authors ba on ba.book_id = b.id
  join authors a on ba.author_id = a.id
where b.title
ilike '%cake%'





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


select
  b.id as book_id,
  -- json_agg(author_names.author_name) as author_names,
  -- string_agg(author_names.author_name::character varying, ',') as author_string,
  max(author_names.names),
  json_agg(author_names.names_json),
  json_agg(tag_counts) as tags,
  string_agg(tag_counts.tag_name::character varying, ',') as tag_string,
  b.title
from books b
  JOIN (
    SELECT book_id, string_agg(name::character varying, ',') as names, json_agg(name) as names_json
      FROM authors a
        JOIN books_authors ba ON a.id = ba.author_id
        JOIN books as b on ba.book_id = b.id
      GROUP BY book_id
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
group by b.id, author_names.book_id
