# 0.0.1

* Rating books has faster response time on the rating element
* App now warns user if they try to submit a review with a summary longer than 255 characters
* User metadata (reads, wishlist, favourites) now debounce properly so as not to create double entries in the database. They also perform faster and provide instant feedback to the user that they have been clicked.
* Links on the list items on the front page now give proper user feedback when hovering. Title now also links to book.