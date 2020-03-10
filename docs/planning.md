# BOOK CLUB

The internet has provided opportunities for increasingly more niche communities to find one another and share content and experiences. When it comes to book recommendations, large services like Amazon, Goodreads, or even public libraries and book stores fall short in offering categorization, recommendations, or searchability when extreme specificity is required.

It's easy enough to browse titles in the Science and Technology category, but what if a user wants a new book specifically about geomorphology of the planet Venus, or challenges of implementing thorium reactors? For these topics, users are left scouring message boards or hoping to run across an expert in the wild.

This Book Club app seeks to solve this problem by allowing users to create communities around their favourite topic, pull in books to a shared collection, and append their own specific metadata and categorization heirarchy. They can then share this with others and provide common spaces for niche communities to geek out about their favourite topics.

## Defintions

1. Community
  * A group of people who jointly curate a collection of books
2. Collection
  * A curated list of books with community-appended meta-data

## Roles

1. Community Owner
2. Comunity Moderator
3. Community Member
4. Authenticated Non-members / Unauthenticated Users

## Product Roadmap for Planning Purposes

# MVP

* fake list of communities
* database of books
  * Amazon metadata
    * Title
    * Author
    * Description
    * Year Published
    * Fiction/Non-Fiction
    * Image URL
  * Custom Metadata
    * tags
    * automatic logic to bundle tags
* Search collection
  * Search by string against title, author, description, tag
  * Search by tag
  * View all books
* Single Book View
  * Amazon Data
  * Community Data
* Community Owner Privileges
* Community Moderator Privileges
  * Remove a book
* Community Member Privileges
  * Add a book

# Features

## User-specific Data

* User Profile
  * Shows "have read list"
  * Shows reviews
  * Shows favs
* User Wish List 
  * Which books I want to read
* add user specific metadata to each book
  * User rating
  * User review
  * Have read or not
  * Favorites
* Search by 
  * all this new data in algorithm

## Manual Schemas

* Community Dashboard
  * Accessible to Onwers/Moderators
  * Manually merge tags
  * View tag cloud
  * view most read, highest rated

## Recommendations

* Serve users recommendations on page load
  * Most read
  * Highest Rated 
  * Random book
  * Community Favourite
  * Newly Added
* Community Owners/Moderators
  * Select Book of the Month
  * Serve this as a recommend

## Affiliate Links

* Book View has affiliate links to allow owners to generate income

## Mailing List

* Get a newsletter from the owner/moderator
* Book of the Month, other recommends

## Social Sharing

* Social Link Previews for Cards

## Book Club

* MVP
  * community picks a book and a read-by date
  * members can join the event
  * reminder emails 
  * at end, invite user to review
  * reviews go to main book view
  * book club instance preserves that instance reviews
  * book club instance appears on user profiles
* Stretch
  * Reply to reviews for discussion
* Stretch 2
  * Segmented milestones
