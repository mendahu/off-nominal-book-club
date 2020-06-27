# 0.1.1

- All interactive elements on the Book View page (rating, review, mark as read, mark as favourite, add to wishlist, and tagging) now give instant feedback and no longer produce erroneous duplicate database entries if users click multiple times very quickly
- User review submissions have new error handling process which provides more user feedback
- App now warns user if they try to submit a review with a summary longer than 255 characters
- Links on the list items on the front page now give proper user feedback when hovering. Book title now also links to the book.
- Average ratings on front page list now accurately display
- Users can now ctrl/cmd click to open Book links in new tabs
- Title image/brand tag now properly appear as a link when you hover your cursor
- App now successfully handles patreon users who don't actually pledge to WeMartians or MECO without crashing
- Minor typos/formatting fixed
- Search bar on main page now has a clear button which can reset search results

# 0.1.2

- Fixed bug where book-view was crashing if the user hadn't added any tags

# 0.1.3

- Fixed bug where url slug was not displaying properly after adding a book
- Fixed bug where url slug was omitting numbers
- Fixed bug where casing on tag entry would create duplicates
- Fixed bug where manually typing in tags that were already appended would create duplicates
- Fixed bug where Patreon Tokens would not refresh properly

# 0.2.0

- User Profile information now appears in the menu drawer for quick reference

- Fixed bug that allowed non-authenticated users and non-patrons to increment, decrement tags.
- Fixed bug where invalid book URL would break site
- Refactored User Fetching to reduce API calls and improve performance on client-side rendered pages
- Redesigned responsive User Profile Page
- - Users can now change profile picture, update name and bio, disconnect and connect Patreon account, and trigger password resets
- User reviews in book view now show profile picture

# 0.2.1
