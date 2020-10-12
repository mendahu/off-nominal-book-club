const queries = require('../../../db/queries/books')
import auth0 from '../../../lib/auth0'
import userProfileFetcher from '../../../src/helpers/userProfileFetcher'
import { NextApiRequest, NextApiResponse } from 'next'

export const newBook = async (req: NextApiRequest, res: NextApiResponse) => {

  const userProfile = await userProfileFetcher(req)
  if (!userProfile.isPatron) {
    return res.status(403).end(JSON.stringify({error: "not_authenticated", message: "Access restricted to logged in patrons only."}))
  }

  const { method  } = req
  let bookObj = {}
  
  switch (method) {
    case 'GET' : 
    
      bookObj = {
        google_id: req.query.googleid || null,
        isbn13: req.query.isbn13 || null,
        title: req.query.title || null,
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
      
      bookObj =  req.body
       
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

export default auth0.requireAuthentication((req, res) => {
  return newBook(req, res);
});