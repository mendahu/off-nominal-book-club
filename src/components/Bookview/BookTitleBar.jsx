import { Paper } from "@material-ui/core";

const BookTitleBar = (props) => {


  return (
    <Paper>
      <h1>{props.title}</h1>
      <h2>User Id: {props.userId}</h2>
      <h4>{props.authors.map((author) => author.name + " - ")} {props.year}</h4>
      <img src={props.img} />
    </Paper>
  )
}

export default BookTitleBar