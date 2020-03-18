import TagItem from "./TagItem";

const BookTagList = (props) => {

  return (
    <>
      {props.tags.map((t, index) => (
        <TagItem key={index} tag={t.tag_name} count={t.count} />
      ))}
    </>
  )
}

export default BookTagList