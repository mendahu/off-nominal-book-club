export const truncateTitle = (title: string, maxLength?: number): string => {
  const length = maxLength || 25;

  if (title.length < length) {
    return title;
  }

  let truncatedTitle = title.slice(0, length);
  let finalSpace = truncatedTitle.lastIndexOf(" ");
  truncatedTitle = truncatedTitle.slice(0, finalSpace) + "...";
  return truncatedTitle;
};

export default truncateTitle;
