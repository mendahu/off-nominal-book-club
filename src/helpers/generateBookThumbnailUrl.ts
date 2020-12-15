export const generateBookThumbnailUrl = (id: string, zoom: number): string =>
  `https://books.google.com/books/content?id=${id}&printsec=frontcover&img=1&zoom=${zoom}`;
