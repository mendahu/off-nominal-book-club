const tagsData = require('../testdata_tags.json') 

exports.seed = function(knex) {

  const users = knex('users').select("id")
  const clearTags = knex("tags").del()
  const clearTagRelationships = knex("user_tag_book").del()

  // Deletes ALL existing entries
  return Promise.all([clearTags, clearTagRelationships, users])   
    .then((results) =>{

      //containers for tag relationships
      const tags = [];
      const tagRels = [];

      results[2].forEach((user) => {
        //generate a random number representing how many books they read
        const bookCount = Math.floor(Math.random() * 30) + 10
        
        //keep track of books already read
        const bookIdArray = [];

        //loop an amount of times equal to book count over books
        for (let i = 0; i < bookCount; i++) {
          //to hold bookId that we are reading
          let bookId;
          
          //generate a random book id and assign it to bookId
          const idGenerator = () => {
            bookId = Math.floor(Math.random() * Object.keys(tagsData).length) + 1;

            (bookIdArray.includes(bookId))
              ? idGenerator()
              : bookIdArray.push(bookId);
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

            (bookIdArray.includes(tag))
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
      })
      const dupFilterer = (words) => words.filter((v, i) => words.indexOf(v) === i)

      return [dupFilterer(tags), tagRels];
    })
    .then((inserts) => {

      const tags = inserts[0].map((tag) => { return {name: tag} } )

      return knex('tags').insert(tags)
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
