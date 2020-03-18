const TagItem = (props) => {

  console.log(props)
  return (
    <div>
      <h1>{props.tag}</h1>
      <h2>{props.count}</h2>
    </div>
  )
}

export default TagItem