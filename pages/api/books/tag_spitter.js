const data = require('../../../db/testdata_books.json')
const books = data.items;
const queries = require('../../../db/queries/tag_spitter')

export default (req, res) => {

  queries
    .books
    .getAll()
      .then((allBooks) => {
        const results = {};
      
        allBooks.forEach((book, i) => {
          const tagObj = {
            book_id: allBooks[i].id,
          }

          //pulls unique words out of the description field, returned as an array (dupTags)
          const descWords = allBooks[i].description.split(" ");
          const dupFilterer = (words) => words.filter((v, i) => words.indexOf(v) === i)
          const dupTags = dupFilterer(descWords);
          
          console.log(dupTags)

          //Removes special characters
          const clearWords = dupTags.map((word) => word.replace(/[^a-zA-Z ]/g, ""))

          console.log(clearWords)

          //filters out common words
          const commonWords = ["youre","sure","take","second","between","own","text","book","line","over","under","few","many","dc","us","we","you","found","end","across","beyond","created","new","modes","i","really","writes","both","over","under","dr","who", "what", "where", "when", "why", "how","","us","is","also","work","head","past","tour","our","the","of","and","a","to","in","is","you","that","it","he","was","for","on","are","as","with","his","they","I","at","be","this","have","from","or","one","had","by","word","but","not","what","all","were","we","when","your","can","said","there","use","an","each","which","she","do","how","their","if","will","up","other","about","out","many","then","them","these","so","some","her","would","make","like","him","into","time","has","look","two","more","write","go","see","number","no","way","could","people","my","than","first","water","been","call","who","oil","its","now","find","long","down","day","did","get","come","made","may","part"];
          const commonFilterer = (words) => words.filter((v, i) => !commonWords.includes(v.toLowerCase()))
          const uncommonWords = commonFilterer(clearWords)

          results[allBooks[i].id] = uncommonWords.slice(0,10);
        }) 



        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(results))
      })
};