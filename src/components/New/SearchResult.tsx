import { Button, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

type SearchResultsProps = {
  cover: string,
  title: string,
  authors: string,
  year: number | string,
  description: string,
  clickHandler: () => void
}

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    display: 'flex'
  },
  infoBox: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    marginLeft: theme.spacing(2)
  }
}));

const SearchResult = ({ cover, title, authors, year, description, clickHandler }: SearchResultsProps) => {
  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      <div>
        <img src={cover} />
      </div>
      <div className={classes.infoBox}>
        <Typography component="h2" variant="h5">{title}</Typography>
        <Typography component="h3" variant="subtitle2" paragraph>{authors} - {year}</Typography>
        <Typography variant="body2" paragraph>{description}</Typography>
        <Button variant="contained" color="primary" onClick={clickHandler}>Add to Book Club</Button>
      </div>
    </Paper>
  )
}

export default SearchResult;