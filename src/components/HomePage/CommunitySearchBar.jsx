import { makeStyles, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: "flex",
      flexGrow: 1,
      maxWidth: "auto"
    },
    paper: {
      display: "flex",
      margin: "auto",
      width: "100%"
    },
    input: {
      flex: 1,
      width: "80%",
      margin: 10
    },
    button: {
      margin: 10
    },
    iconButton: {
      padding: 10
    }
  })
);

const CommunitySearchBar = () => { 
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <Paper component='form' className={classes.paper}>
        <InputBase
          className={classes.input}
          placeholder='Search for a Community.'
        />
        <SearchIcon className={classes.iconButton} aria-label='search' />
        <Button
          className={classes.button}
          variant='contained'
          color='primary'
          onClick={event => {
            event.preventDefault();
            props.onClick();
          }}>
          ADD
        </Button>
      </Paper>
    </section>
  )
}

export default CommunitySearchBar;