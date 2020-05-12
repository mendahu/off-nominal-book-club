import { BookTag, UserTag, JoinedTag } from '../types/common';

export const tagJoiner = (
  commTags: BookTag[],
  userTags: UserTag[]
): JoinedTag[] => {
  if (!commTags || !userTags) return commTags;

  const joinedTags: JoinedTag[] = [...commTags];

  joinedTags.forEach((tag, index) => {
    const tagIndex: number = userTags.findIndex(
      (userTag) => userTag.tag_id === tag.tag_id
    );
    if (tagIndex >= 0)
      joinedTags[index].tagRelId = userTags[tagIndex].tag_rel_id;
  });

  return joinedTags;
};

export default {
  tagJoiner,
};
