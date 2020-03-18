import { Paper } from "@material-ui/core";

const BookDesc = (props) => {
  return (
    <Paper>
      <h2>Description</h2>
      <p>{props.desc}</p>
    </Paper>
  )
}

export default BookDesc