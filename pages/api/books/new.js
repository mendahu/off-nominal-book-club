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
        
        bookObj = req.body

       
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