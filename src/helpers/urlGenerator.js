const urlGenerator = (bookId, authorString, titleString) => {

  const urlComponents = [bookId]
  const authors = authorString.replace(/[^a-zA-Z ]/g, "").split(" ")
  authors.forEach(author => urlComponents.push(author.toLowerCase()))

  const title = titleString.replace(/[^a-zA-Z ]/g, "").split(" ")
  title.forEach(word => urlComponents.push(word.toLowerCase()))

  return urlComponents.join("-")
}

export default urlGenerator;