export const getThumbnail = (book): string => book.volumeInfo.imageLinks?.thumbnail || "/generic_book.png";

export const getAuthorString = (book): string => book.volumeInfo.authors?.join(', ') || "No author";

export const getPublishedYear = (book): number | string => {
  const { volumeInfo: { publishedDate }} = book;
  return publishedDate ? new Date(publishedDate).getFullYear() : "No publication date"
}

export const getDescription = (book): string => book.volumeInfo.description || "No description available";

export const getTitle = (book): string => book.volumeInfo.title || "No title";

export const getGoogleId = (book): string => book.id

export const getIsbn13 = (book): string | undefined => {
  const { industryIdentifiers } = book.volumeInfo
  return industryIdentifiers && industryIdentifiers.find((identifier) => identifier.type === "ISBN_13")
}