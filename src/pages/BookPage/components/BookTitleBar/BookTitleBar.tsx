import { Paper, CardContent, Grid, Typography } from '@material-ui/core';
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

        <BookStats
          metaData={metaData}
          bookId={bookId}
          ratingString={ratingString}
        />

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
