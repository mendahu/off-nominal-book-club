import { Paper, Grid, Typography, Chip } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { BookStats } from '../../../../components/BookStats/BookStats';
import { MetaFlagData } from '../../../../components/BookStats/MetaFlags/MetaFlags';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(1, 0, 0, 0),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  title: {
    padding: theme.spacing(2),
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
  chip: {
    marginRight: theme.spacing(1),
  },
  chipContainer: {
    marginTop: theme.spacing(1),
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
  isFiction: boolean;
  isTextbook: boolean;
};

const BookTitleBar = ({
  metaData,
  bookId,
  authorString,
  thumbnail,
  ratingString,
  title,
  year,
  isFiction,
  isTextbook,
}: BookTitleBarProps) => {
  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <Paper className={classes.root}>
        <img src={thumbnail} />

        <BookStats
          metaData={metaData}
          bookId={bookId}
          ratingString={ratingString}
        />

        <div className={classes.title}>
          <Typography variant="h5" component="h1">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {authorString} - {year}
          </Typography>
          <div className={classes.chipContainer}>
            <Chip
              label={isFiction ? 'Fiction' : 'Non-fiction'}
              size="small"
              className={classes.chip}
            />
            {isTextbook && (
              <Chip label="Textbook" size="small" className={classes.chip} />
            )}
          </div>
        </div>
      </Paper>
    </Grid>
  );
};

export default BookTitleBar;
