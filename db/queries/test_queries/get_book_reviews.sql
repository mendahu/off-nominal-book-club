select users.id, reviews.book_id, reviews.user_id, rating 
from reviews 
  join users on users.id = reviews.user_id
  join ratings on reviews.book_id = ratings.book_id
where reviews.book_id = 94;