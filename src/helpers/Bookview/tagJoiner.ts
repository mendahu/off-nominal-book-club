interface bookTag {
  tag_id: number;
  tag_name: string;
  count: number;
}

interface userTag {
  tag_id: number;
  tag_rel_id: number;
}

interface joinedTag {
  tag_id: number;
  tag_name: string;
  count: number;
  tagRelId?: number;
}

export const tagJoiner = (commTags: bookTag[], userTags: userTag[]): joinedTag[] => {

  if (!commTags || !userTags) return commTags;

  const joinedTags: joinedTag[] = [...commTags]

  joinedTags.forEach((tag, index) => {
    const tagIndex: number = userTags.findIndex(userTag => userTag.tag_id === tag.tag_id)
    if (tagIndex >= 0) joinedTags[index].tagRelId = userTags[tagIndex].tag_rel_id
  })

  return joinedTags;
}

export default tagJoiner;