import { Author } from '../types/common';

export const generateAuthorString = (authors: Author[]): string => {
  const names = authors.map((author) => author.name);
  return names.join(', ');
};

export default generateAuthorString;
