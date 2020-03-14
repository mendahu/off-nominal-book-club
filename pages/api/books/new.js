const queries = require('../../../db/queries/books')

const handler = (req, res) => {
  const bookObj = {
    user_id: 10,
    title: "Life, the Universe, and Everything",
    description: "A book about life, the universe, and everything",
    fiction: true,
    year: "1982",
    image_url: "https://i.ebayimg.com/images/g/48IAAOSwXcRZb5Sr/s-l300.jpg"
  }

  const authorObj = {
    name: "Douglas Adams"
  }

  queries
    .books
    .add(bookObj, authorObj)
    .then(() => {
      res.send(200)
      console.log("Book successfully added")
    })
};

export default handler 
