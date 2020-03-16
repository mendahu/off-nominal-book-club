const queries = require('../../../db/queries/books')

export default (req, res) => {
  const { method } = req
  let bookObj = {}
  
  switch (method) {
    case 'GET' :
      console.log("in Get")
    
      bookObj = {
        google_id: req.query.googleid,
        isbn13: req.query.isbn13,
        title: req.query.title,
      }
    
    
    
      queries
        .books
        .confirm(bookObj)
        .then((results) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(results))
        })
      break
    case 'POST':
        console.log(req.body)
        // bookObj = req.body

        bookObj = {
          book: {
            user_id: 10,
            title: "The Tipping Point",
            description: "A book about stuff",
            fiction: true,
            year: "2010",
            image_url: "http://books.google.com/books/content?id=yBDBEGBIUmgC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
            google_id: "yBDBEGBIUmgC",
            isbn13: "0759574731"
          },
          author: {
            name : "Malcom"
          }
        }
        console.log(bookObj)

        console.log("in POST")
      queries
        .books
        .add(bookObj)
        .then((results) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(results))
        })
      break
      default:
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${method} Not Allowed`)
        res.redirect('/')
  }
};