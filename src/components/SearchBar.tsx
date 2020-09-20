import { makeStyles, createStyles } from '@material-ui/core/styles';
import { InputBase, Paper, Button } from '@material-ui/core';
import Link from 'next/link';

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      display: 'flex',
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

export type SearchBarProps = {
  placeholderText: string;
  text: string;
  onChange: () => void;
  button?: {
    text: string;
    href?: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  };
};

export default function SearchBar({
  placeholderText,
  text,
  onChange,
  button,
}: SearchBarProps) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <InputBase
        className={classes.input}
        placeholder={placeholderText}
        value={text}
        onChange={onChange}
      />
      {button &&
        (button.href ? (
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
        ))}
    </Paper>
  );
}
