import { useState } from 'react';
import {
  Button,
  Paper,
  Typography,
  IconButton,
  Collapse,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';

type SearchResultsProps = {
  cover: string;
  title: string;
  authors: string;
  year: number | string;
  description: string;
  clickHandler: () => void;
};

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    display: 'flex',
  },
  infoBox: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  descriptionContainer: {
    paddingRight: theme.spacing(1),
    display: 'flex',
    alignItems: 'flex-start',
  },
}));

const SearchResult = ({
  cover,
  title,
  authors,
  year,
  description,
  clickHandler,
}: SearchResultsProps) => {
  const classes = useStyles();

  const [expanded, setExpanded] = useState(false);

  return (
    <Paper className={classes.container}>
      <div>
        <img src={cover} />
      </div>
      <div className={classes.infoBox}>
        <Typography component="h2" variant="h5">
          {title}
        </Typography>
        <Typography component="h3" variant="subtitle2" paragraph>
          {authors} - {year}
        </Typography>
        <div className={classes.descriptionContainer}>
          <Collapse in={!expanded} timeout={0} unmountOnExit>
            <Typography paragraph color="textSecondary">
              {description?.slice(0, 100) + '...'}
            </Typography>
          </Collapse>
          <Collapse in={expanded} timeout={0} unmountOnExit>
            <Typography paragraph color="textSecondary">
              {description}
            </Typography>
          </Collapse>

          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </div>
        <Button variant="contained" color="primary" onClick={clickHandler}>
          Add to Book Club
        </Button>
      </div>
    </Paper>
  );
};

export default SearchResult;
