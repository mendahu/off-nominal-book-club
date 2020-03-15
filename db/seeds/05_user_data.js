const tagsData = require('../testdata_tags.json')

///////////////////////////////////////////////////////////
// this seed file simulates user data programatically    //
// It randomly creates an instance of a subset of        //
// existing users and books, and the interactions they   //
// create. For example, it will have users read, rate    //
// review, tag, fav, and add to wishlist a group of      //
// books randomly.                                       //
///////////////////////////////////////////////////////////


exports.seed = function(knex) {

  //begin seed simulation by pulling existing users from the db
  //it depends on previous users seed completing
  const users = knex('users').select("id")

  //clear all user metadata tables if they have data in them
  const clearTags = knex("tags").del()
  const clearTagRelationships = knex("user_tag_book").del()
  const clearReads = knex("reads").del()

  // wait for above operations to conclude, then begin simulation
  return Promise.all([clearTags, clearTagRelationships, clearReads, users])   
    .then((results) =>{

      //containers for data inserts
      //these are the arrays that will eventually be added to the db
      const tags = [];
      const tagRels = [];
      let reads = [];




      //begin simulating user data by looping through each user
      results[3].forEach((user) => {

        //generate a random number representing how many books they read
        const bookCount = Math.floor(Math.random() * 30) + 10
        
        //keep track of books already read
        const readBooks = [];

        //loop an amount of times equal to book count over books
        for (let i = 0; i < bookCount; i++) {
          //to hold bookId that we are reading
          let bookId;
          
          //generate a random book id and assign it to bookId
          const idGenerator = () => {
            bookId = Math.floor(Math.random() * Object.keys(tagsData).length) + 1;

            (readBooks.includes(bookId))
              ? idGenerator()
              : readBooks.push(bookId);
          }
          idGenerator();


          //keep track of tags already selected for this book
          const tagArray = [];

          //for each book loop 5 times to add 5 tags
          for (let i = 0; i < 5; i++) {
            //hold the tag we are working with
            let tag;

            //generate a random tag and assign it to tag
            const tagGenerator = () => {
            tag = Math.floor(Math.random() * tagsData[bookId.toString()].length);

            (readBooks.includes(tag))
              ? tagGenerator()
              : tagArray.push(tag);
            }
            tagGenerator();

            tags.push(tagsData[bookId.toString()][tag].toLowerCase())
            tagRels.push({
              tag_name: tagsData[bookId.toString()][tag].toLowerCase(),
              book_id: bookId,
              user_id: user.id
            })
          }
        }

        for (const book of readBooks) {
          reads.push({ 
            book_id: book,
            user_id: user.id
          })
        }


      })
      const dupFilterer = (words) => words.filter((v, i) => words.indexOf(v) === i)

      return [dupFilterer(tags), tagRels, reads];
    })
    .then((inserts) => {

      //maps the tags to objects which can be inserted
      const tags = inserts[0].map((tag) => { return {name: tag} } )

      console.log(inserts[2])

      //insert reads and tags into database
      const readInsert = knex('reads').insert(inserts[2])
      const tagInsert = knex('tags').insert(tags)

      return Promise.all([tagInsert, readInsert])
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
      //return knex('user_tag_book').insert({user_id, book_id, tag_id: tagId}) 


    });
};
