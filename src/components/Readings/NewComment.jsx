import TextField from "@material-ui/core/TextField";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { Button, makeStyles, IconButton } from "@material-ui/core";

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
export default function NewComment() {
  const classes = useStyles();
  return (
    <form className={classes.root}>
      <TextField
        className={classes.textField}
        id='outlined-textarea'
        label='Add a Comment'
        placeholder='Comment'
        multiline
        variant='outlined'
      />
      <Button className={classes.button}>
        <AddBoxIcon clasName={classes.icon} />
      </Button>
    </form>
  );
}
