import { makeStyles, createStyles } from "@material-ui/core/styles";
import {
  Box,
  Paper, 
  InputBase,
  Button 
} from "@material-ui/core";

const useStyles = makeStyles(theme =>
  createStyles({
    paper: {
      display: "flex",
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
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
    <Box component="section">
      <Paper component='form' className={classes.paper} elevation={3}>
        <InputBase
          className={classes.input}
          placeholder='Find your people'
        />
        <Button
          className={classes.button}
          variant='contained'
          color='primary'
          onClick={event => {
            event.preventDefault();
            props.onClick();
          }}>
          Search
        </Button>
      </Paper>
    </Box>
  )
}

export default CommunitySearchBar;