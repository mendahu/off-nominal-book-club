import { Paper, CardContent, Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Star from '@material-ui/icons/Star';
import MetaFlags, {
  MetaFlagData,
} from '../../../../components/MetaFlags/MetaFlags';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(1, 0, 0, 0),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metaData: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-evenly',
    order: 3,
    minWidth: 100,
    [theme.breakpoints.down('xs')]: {
      order: 2,
    },
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  ratings: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(1),
  },
  star: {
    marginRight: '2px',
  },
  title: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    flexGrow: 1,
    order: 2,
    [theme.breakpoints.down('xs')]: {
      order: 3,
      flex: '1 0 100%',
    },
  },
}));

export type BookTitleBarProps = {
  bookId: number;
  metaData: MetaFlagData;
  authorString: string;
  thumbnail: string;
  ratingString: string;
  title: string;
  year: string;
};

const BookTitleBar = ({
  metaData,
  bookId,
  authorString,
  thumbnail,
  ratingString,
  title,
  year,
}: BookTitleBarProps) => {
  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <Paper className={classes.root}>
        <img src={thumbnail} />

        <div className={classes.metaData}>
          <div className={classes.ratings}>
            <Star htmlColor="#ffd54f" className={classes.star} />
            <Typography component="h1">{ratingString}</Typography>
          </div>

          <MetaFlags metaData={metaData} bookId={bookId} />
        </div>

        <CardContent className={classes.title}>
          <Typography variant="h5" component="h1">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {authorString} - {year}
          </Typography>
        </CardContent>
      </Paper>
    </Grid>
  );
};

export default BookTitleBar;
