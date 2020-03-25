import { makeStyles, createStyles } from "@material-ui/core/styles";
import { 
  InputBase,
  Paper,
  Button,
  Box } from "@material-ui/core";
import Link from 'next/link'

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
    }
  })
);

export default function SearchBar(props) {
  const classes = useStyles();

  return (
    <Box component='section'>
      <Paper component='form' className={classes.paper}>
        <InputBase
          className={classes.input}
          placeholder={props.placeholderText}
          value={props.input}
          onChange={props.onChange}
        />
        <Link href={props.buttonHref} passHref>
          <Button
            className={classes.button}
            variant='contained'
            color='primary'
            component='a'>
            {props.buttonText}
          </Button>
        </Link>
      </Paper>
    </Box>
  );
}
