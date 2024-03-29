import { generateBookThumbnailUrl } from "../../helpers/generateBookThumbnailUrl";

export const altTextBuilder = (title: string, authorString: string): string => {
  return `Book cover for ${title} by ${authorString}`;
};

export type BookThumbnailProps = {
  id: string;
  zoom?: 1 | 2 | 3 | 4;
  title: string;
  authorString: string;
  width?: string;
};

export const BookThumbnail = ({
  id,
  zoom = 1,
  title,
  authorString,
  width = "auto",
}: BookThumbnailProps) => {
  const thumbnail = generateBookThumbnailUrl(id, zoom);
  const altText = altTextBuilder(title, authorString);

  return <img src={thumbnail} alt={altText} width={width} />;
};
