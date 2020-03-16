const tagsData = require('../testdata_tags.json')

///////////////////////////////////////////////////////////
// this seed file simulates user data programatically    //
// It randomly creates an instance of a subset of        //
// existing users and books, and the interactions they   //
// create. For example, it will have users read, rate    //
// review, tag, fav, and add to wishlist a group of      //
// books randomly.                                       //
///////////////////////////////////////////////////////////


//Random Selector Function
//Used to select a random subset of a dataset, without duplicates
const randomIdGenerator = (itemTracker, sampleSetSize, offset = 0) => {

  console.log("inside randomFunc", itemTracker, sampleSetSize, offset)
  const randomId = Math.floor(Math.random() * sampleSetSize) + offset;
  console.log("checking", randomId)

  if (itemTracker.includes(randomId)) {
    return randomIdGenerator(itemTracker, sampleSetSize, offset)
  } else {
    return randomId
  }

}

exports.seed = function(knex) {

  //begin seed simulation by pulling existing users from the db
  //it depends on previous users seed completing
  const users = knex('users').select("id")

  //clear all user metadata tables if they have data in them
  const clearTags = knex("tags").del()
  const clearTagRelationships = knex("user_tag_book").del()
  const clearReads = knex("reads").del()
  const clearFavs = knex("favourites").del()

  const initPromises = [
    users,
    clearTags,
    clearTagRelationships,
    clearReads,
    clearFavs
  ]

  // wait for above operations to conclude, then begin simulation
  return Promise.all(initPromises)   
    .then((results) =>{

      //containers for data inserts
      //these are the arrays that will eventually be added to the db
      const tags = [];
      const tagRels = [];
      let reads = [];
      let favs = [];



      //begin simulating user data by looping through each user
      results[0].forEach((user) => {

        //generate a random number representing how many books they read
        const bookCount = Math.floor(Math.random() * 30) + 10
        
        //keep track of books already read
        const readBooks = [];

        //loop an amount of times equal to book count over books
        for (let i = 0; i < bookCount; i++) {

          //how many books are there?
          bookSampleSize = Object.keys(tagsData).length

          //generate a random book id and assign it to bookId, add to array of tracked books
          const bookId = randomIdGenerator(readBooks, bookSampleSize, 1);
          readBooks.push(bookId);

          //keep track of tags already selected for this book
          const tagArray = [];

          //for each book loop 5 times to add 5 tags
          for (let i = 0; i < 5; i++) {

            //how many tags can we work with?
            const tagSampleSize = tagsData[bookId].length

            //hold the tag we are working with
            //generate a random tag and assign it to tag
            const tagId = randomIdGenerator(tagArray, tagSampleSize)
            tagArray.push(tagId);

            //Add the tag to the tags table and the tags relationship table
            tags.push(tagsData[bookId][tagId].toLowerCase())
            tagRels.push({
              tag_name: tagsData[bookId][tagId].toLowerCase(),
              book_id: bookId,
              user_id: user.id
            })

            //catch for any tag sets that are fewer than 5 - forces it out of the loop
            if (tagSampleSize - 1 === i) i = 5;
          }

  
        }

        //push each read book into the reads array as an input object
        for (const book of readBooks) {
          reads.push({ 
            book_id: book,
            user_id: user.id
          })
        }

        //push a random 33% of read books into the favs array
        for (const book of readBooks) {
          if (Math.random() < 0.33) {
            favs.push({ 
              book_id: book,
              user_id: user.id
            })
          }
        }

      })
      const dupFilterer = (words) => words.filter((v, i) => words.indexOf(v) === i)

      return [dupFilterer(tags), tagRels, reads, favs];
    })
    .then((inserts) => {

      //maps the tags to objects which can be inserted
      const tags = inserts[0].map((tag) => { return {name: tag} } )

      //insert reads, favs and tags into database
      const readInsert = knex('reads').insert(inserts[2])
      const favsInsert = knex('favourites').insert(inserts[3])
      const tagInsert = knex('tags').insert(tags)

      return Promise.all([tagInsert, readInsert, favsInsert])
        .then(() => {
          return knex.select().from('tags')
        })
        .then((tags) => {
          
          //Creates a lookup object to get id from name
          const tagLookupObj = {};
          tags.forEach((tag) => {
            tagLookupObj[tag.name] = tag.id
          })

          //appends the tag id to each tag relationship
          inserts[1].forEach((tagRel) => {
            tagRel.tag_id = tagLookupObj[tagRel.tag_name]
          })

          //map out the names
          const finalInsert = inserts[1].map((rel) => { 
            return { 
              book_id: rel.book_id,
              user_id: rel.user_id,
              tag_id: rel.tag_id 
            }
          })

          return knex('user_tag_book').insert(finalInsert)
          
        })
    });
};
