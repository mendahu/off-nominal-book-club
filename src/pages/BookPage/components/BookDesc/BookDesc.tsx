import { 
  Grid, 
  Paper,
  CardContent, 
  Typography, 
  IconButton,
  Collapse } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react'
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
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
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 2, 1, 2)
  }
}));

const BookDesc = (props) => {

  const classes = useStyles();

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid item xs={12} sm={8}>
      <Paper>

        <CardContent className={classes.header}>
          <Typography component='h2' variant='h5'>Description</Typography>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardContent>

        <Collapse in={!expanded} timeout={0} unmountOnExit>
          <CardContent>
            <Typography paragraph color='textSecondary'>{props.desc?.slice(0, 100) + '...'}</Typography>
          </CardContent>
        </Collapse>
        <Collapse in={expanded} timeout={0} unmountOnExit>
          <CardContent>
            <Typography paragraph color='textSecondary'>{props.desc}</Typography>
          </CardContent>
        </Collapse>

      </Paper>
    </Grid>
  )
}

export default BookDesc