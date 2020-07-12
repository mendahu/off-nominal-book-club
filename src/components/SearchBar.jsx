import { makeStyles, createStyles } from '@material-ui/core/styles';
import { InputBase, Paper, Button, Box } from '@material-ui/core';
import Link from 'next/link';

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      display: 'flex',
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
      margin: 'auto',
      width: '100%',
    },
    input: {
      flex: 1,
      width: '80%',
      margin: 10,
    },
    button: {
      margin: 10,
    },
  })
);

export default function SearchBar({ placeholderText, text, onChange, button }) {
  const classes = useStyles();

  return (
    <Box component="section">
      <Paper className={classes.paper}>
        <InputBase
          className={classes.input}
          placeholder={placeholderText}
          value={text}
          onChange={onChange}
        />
        {button.href ? (
          <Link href={button.href} passHref>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              component="a"
            >
              {button.text}
            </Button>
          </Link>
        ) : (
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={(e) => button.onClick(e)}
          >
            {button.text}
          </Button>
        )}
      </Paper>
    </Box>
  );
}
