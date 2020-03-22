const tagsData = require('../testdata_tags.json')

///////////////////////////////////////////////////////////
// this seed file simulates user data programatically    //
// It randomly creates an instance of a subset of        //
// existing users and books, and the interactions they   //
// create. For example, it will have users read, rate    //
// review, tag, fav, and add to wishlist a group of      //
// books randomly.                                       //
//                                                       //
// This is useful for creating realistic data from which //
// to demonstrate the application                        //
///////////////////////////////////////////////////////////


//Random number generator
const randomNumGen = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min
}

//Random Selector Function
//Used to select a random item of a dataset, without duplicates from a reference array
const randomIdGenerator = (itemTracker, sampleSetSize, offset = 0) => {
  const randomId = randomNumGen(offset, sampleSetSize)
  return (itemTracker.includes(randomId)) ? randomIdGenerator(itemTracker, sampleSetSize, offset) :  randomId
}

exports.seed = function(knex) {

  //begin seed simulation by pulling existing users from the db
  //it depends on previous users seed completing
  const users = knex('users').select("id")

  //clear all user metadata tables if they have data in them
  const initPromises = [
    users,
    knex("tags").del(),
    knex("user_tag_book").del(),
    knex("reads").del(),
    knex("favourites").del(),
    knex("ratings").del(),
    knex("reviews").del(),
    knex("wishlist").del(),
  ]

  // wait for above operations to conclude, then begin simulation
  return Promise.all(initPromises)   
    .then((results) =>{

      //set users 
      const [ users ] = results

      //containers for data inserts
      //these are the arrays that will eventually be added to the db
      const tags              = [];
      let insertableTags;
      const tagRels           = [];
      const reads             = [];
      const favs              = [];
      const ratings           = [];
      const reviews           = [];
      const wishlist          = [];

      //begin simulating user data by looping through each user
      users.forEach(user => {

        //generate a random number representing how many books a user has read with min/max
        const bookCount = randomNumGen(10, 40)
        
        //keep track of books and books already read
        const allBooks = Object.keys(tagsData);
        const readBooks = [];

        //loop an amount of times equal to book count over books
        for (let i = 0; i < bookCount; i++) {

          //generate a random book id and assign it to bookId, add to array of tracked books
          const bookId = randomIdGenerator(readBooks, allBooks.length, 1);
          readBooks.push(bookId);

          //keep track of tags already selected for this book
          const tagArray = [];

          //for each book loop 5 times to add up to 5 tags
          for (let i = 0; i < 5; i++) {

            //how many tags can we work with for this particular book?
            const tagSampleSize = tagsData[bookId].length

            //generate a random tag and assign it to tag, push it to our container array
            const tagId = randomIdGenerator(tagArray, tagSampleSize)
            tagArray.push(tagId);

            //Add the tag to the tags table and the tags relationship table objects for eventual insert
            tags.push(tagsData[bookId][tagId].toLowerCase())

            //a function to clear duplicacte tags from the array
            const dupFilterer = (words) => words.filter((v, i) => words.indexOf(v) === i)
            const filteredTags = dupFilterer(tags)

            //maps the tags to objects which can be inserted
            insertableTags = filteredTags.map((tag) => { return {name: tag} } )

            tagRels.push({
              tag_name: tagsData[bookId][tagId].toLowerCase(),
              book_id: bookId,
              user_id: user.id
            })

            //catch for any tag sets that are fewer than 5 - forces it out of the loop
            if (tagSampleSize - 1 === i) i = 5;
          }
        }

        //Create an array of unread books
        const unreadBooks = allBooks.filter(book => !(readBooks.includes(Number(book))))

        //push a random 5% of unread books into wishlist
        for (const book of unreadBooks) {
          if (Math.random() < 0.05) {
            wishlist.push({ 
              book_id: book,
              user_id: user.id
            })
          }
        }
        
        for (const book of readBooks) {
          //push each read book into the reads array as an input object
          reads.push({ 
            book_id: book,
            user_id: user.id
          })

          //push a random 33% of read books into the favs array
          if (Math.random() < 0.33) {
            favs.push({ 
              book_id: book,
              user_id: user.id
            })
          }

          //rate a random 66% of read books with random rating and review
          if (Math.random() < 0.66) {
  
            const rating = Math.floor(Math.random() * 5) + 1
  
            ratings.push({ 
              rating,
              book_id: book,
              user_id: user.id
            })
  
            const adjectives = [
              "stunning",
              "breathtaking",
              "boring",
              "laboured",
              "exciting",
              "trivial",
              "fascinating",
              "stuttering",
              "forgettable",
              "nonsensical"
            ]

            const randomAdjIndex = Math.floor(Math.random() * 10)

            reviews.push({
              review: `I'm baby snackwave kale chips banh mi, man bun four dollar toast drinking vinegar stumptown wolf letterpress four loko locavore shoreditch flexitarian kickstarter coloring book. Green juice beard messenger bag pabst locavore thundercats man bun asymmetrical stumptown. Farm-to-table lo-fi four loko butcher 3 wolf moon. Food truck hashtag four dollar toast, truffaut banjo tacos subway tile beard. YOLO photo booth paleo la croix ennui whatever mustache flannel. Austin four dollar toast lyft kale chips whatever letterpress mixtape photo booth art party mlkshk. Sustainable williamsburg put a bird on it 3 wolf moon cray YOLO cold-pressed flexitarian truffaut occupy selvage slow-carb. Tumblr 90's activated charcoal vaporware. Twee aesthetic actually synth sriracha austin polaroid craft beer thundercats air plant poutine post-ironic wayfarers kitsch. Coloring book la croix vexillologist tilde kickstarter scenester actually tacos listicle ugh.`,
              summary: `A ${adjectives[randomAdjIndex]} read!`,
              book_id: book,
              user_id: user.id
            })
          }
        }
      })

      return { insertableTags, tagRels, reads, favs, ratings, reviews, wishlist };
    })
    .then((data) => {
      const { insertableTags, tagRels, reads, favs, ratings, reviews, wishlist } = data;

      //insert reads, favs and tags into database
      const insertPromises = [
        knex('tags').insert(insertableTags),
        knex('reads').insert(reads),
        knex('favourites').insert(favs),
        knex('ratings').insert(ratings),
        knex('reviews').insert(reviews),
        knex('wishlist').insert(wishlist)
      ]

      return Promise.all(insertPromises)
        .then(() => {
          return knex.select().from('tags')
        })
        .then((tags) => {
          
          //Creates a lookup object to get id from name
          const tagLookupObj = {};
          tags.forEach((tag) => tagLookupObj[tag.name] = tag.id)

          //appends the tag id to each tag relationship
          tagRels.forEach((tagRel) => tagRel.tag_id = tagLookupObj[tagRel.tag_name])

          //map out the names
          const tagRelationInsertData = tagRels.map((rel) => { 
            return { 
              book_id: rel.book_id,
              user_id: rel.user_id,
              tag_id: rel.tag_id 
            }
          })

          return knex('user_tag_book').insert(tagRelationInsertData)
        })
    });
};
