const queries = require('../../../db/queries/books')

export default (req, res) => {
  const { method } = req
  let bookObj = {}
  
  switch (method) {
    case 'GET' :
    
      bookObj = {
        google_id: req.query.googleid,
        isbn13: req.query.isbn13,
        title: req.query.title,
      }

      return queries
        .books
        .confirm(bookObj)
        .then((results) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json')
          return res.end(JSON.stringify(results))
        })
        .catch(err => console.error(err))

    case 'POST':
        
      bookObj = req.body
       
      return queries
        .books
        .add(bookObj)
        .then((results) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json')
          return res.end(JSON.stringify(results))
        })
        .catch(err => console.error(err))

      default:
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${method} Not Allowed`)
        return res.redirect('/')
  }
};