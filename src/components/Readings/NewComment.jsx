import TextField from "@material-ui/core/TextField";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { Button, makeStyles, IconButton } from "@material-ui/core";
import { useState } from "react";
import Axios from "axios";

const useStyles = makeStyles(them => ({
  root: {
    display: "flex",
    width: "70vw",
    height: "10vh",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  textField: {
    width: "60vw",
    height: "9vh"
  },
  button: {
    width: "10vw",
    height: "10vw"
  },
  icon: {
    fontSize: "large"
  }
}));
export default function NewComment(props) {
  const classes = useStyles();

  const [input, setInput] = useState("");

  function onInputChange() {
    setInput(event.target.value);
  }

  function clearInput() {
    setInput("");
  }

  function onSubmit(event) {
    event.preventDefault();
    Axios.post(`/api/readings/comments/${props.readingId}`, {
      comment: input,
      userId: props.userId
    })
      .then(() => {
        clearInput();
        return Axios.get(`/api/readings/${props.readingId}`);
      })
      .then(res => props.setComments(res.data.comments));
  }

  return (
    <form
      className={classes.root}
      onSubmit={event => {
        onSubmit(event);
      }}>
      <TextField
        className={classes.textField}
        id='outlined-textarea'
        label='Add a Comment'
        placeholder='Comment'
        value={input}
        multiline
        variant='outlined'
        onChange={onInputChange}
      />
      <Button className={classes.button} type='submit'>
        <AddBoxIcon clasName={classes.icon} />
      </Button>
    </form>
  );
}
