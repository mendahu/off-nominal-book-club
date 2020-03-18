SELECT books.id, books.title,

  ( SELECT json_agg(authors) 
  FROM (
    SELECT name 
    FROM authors
      JOIN books_authors ON authors.id = books_authors.author_id
    WHERE books_authors.book_id = 14
  ) as authors ) 
  
  as authors, books.year, books.image_url, 
  
  ( SELECT json_agg(tag)
  FROM (
    SELECT name AS tag_name, COUNT('user_tag_book.id') as count 
    FROM tags
      JOIN user_tag_book ON tags.id = user_tag_book.tag_id
      JOIN books ON user_tag_book.book_id = books.id
    WHERE books.id = 14
    GROUP BY name
    ORDER BY count DESC
  ) tag ) AS tags,

  ( SELECT json_agg(review)
  FROM (
    SELECT reviews.id, reviews.user_id, users.name as name, ratings.rating
    FROM reviews
      JOIN users ON reviews.user_id = users.id
      JOIN ratings ON ratings.book_id = reviews.book_id
    WHERE reviews.book_id = 14 AND ratings.user_id = reviews.user_id
  ) review ) AS reviews

FROM books
WHERE books.id = 14

  