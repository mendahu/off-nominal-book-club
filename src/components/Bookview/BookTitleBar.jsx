const BookTitleBar = (props) => {


  return (
    <>
      <h1>{props.title}</h1>
      <h4>{props.authors.map((author) => author.name + " - ")} {props.year}</h4>
      <img src={props.img} />
    </>
  )
}

export default BookTitleBar