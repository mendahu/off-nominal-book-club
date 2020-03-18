SELECT books.id, 

ARRAY(SELECT name as tag_names
FROM tags
  JOIN user_tag_book as tagrel ON tagrel.tag_id = tags.id
WHERE tagrel.user_id = 1 AND tagrel.book_id = books.id
) as userTags,

(SELECT reads.id AS readId
FROM reads
WHERE reads.user_id = 1 AND reads.book_id = books.id) as read,

(SELECT favourites.id AS favsId
FROM favourites
WHERE favourites.user_id = 1 AND favourites.book_id = books.id) as fav,

(SELECT wishlist.idd AS wishlistId
FROM wishlist
WHERE wishlist.user_id = 1 AND wishlist.book_id = books.id) as wishlist,

rating, review

FROM books
  LEFT JOIN ratings ON ratings.book_id = books.id AND ratings.user_id = 1
  LEFT JOIN reviews ON reviews.book_id = books.id AND reviews.user_id = 1
WHERE books.id = 9