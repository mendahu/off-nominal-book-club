const axios = require('axios')
const fs = require('fs')

const getOnbc = () => {
  return axios.get('http://books.offnominal.space/api/books')
   .then(res => {
     return res.data.map((book) => ({
        id: book.id,
        google_id: book.google_id
      }))
   })
   .catch(err => console.error(err))
}

const googleFetcher = async (googleId) => {
  return axios.get(`https://www.googleapis.com/books/v1/volumes/${googleId}?fields=volumeInfo(industryIdentifiers)`)
  .then((res) => {
    return res.data.volumeInfo.industryIdentifiers
  })
  .catch(err => console.error(err))
}

class JsonObj {
  addObj(id, response) {
    const newisbn10 = response.find(ident => ident.type === 'ISBN_10')
    const newisbn13 = response.find(ident => ident.type === 'ISBN_13')

    this[id] = {
      isbn10: newisbn10 ? newisbn10.identifier : null,
      isbn13: newisbn13 ? newisbn13.identifier : null,
    }
  }
}


getOnbc()
.then((res) => {
  return new Promise((resolve, reject) => {
    let index = 0;
    let looper = null;
    
    const finalJson = new JsonObj;
    const promises = [];
    
    looper = setInterval(() => {

      if (!res[index]) {
        clearInterval(looper)
        Promise.all(promises)
        .then(() => {
          resolve(finalJson)
        })
      } else {
        const id = res[index].id
        const googleId = res[index].google_id
        const newGoogleReq = googleFetcher(googleId)
          .then(googleResponse => {
            finalJson.addObj(id, googleResponse)
          })
          .catch((err) => {
            reject(err)
          })

        promises.push(newGoogleReq)

        index++;
      }
      }, 1001)
      
    })
  .then((res) => {
    stringifiedJson = JSON.stringify(res, null, 2)
    fs.writeFileSync('newIsbnData.json', stringifiedJson)
  })
  .catch(err => {
    console.error(err)
  })  
})