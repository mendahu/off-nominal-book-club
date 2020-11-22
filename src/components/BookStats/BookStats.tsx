import { Typography } from '@material-ui/core';
import Star from '@material-ui/icons/Star';
import { makeStyles, Theme } from '@material-ui/core/styles';
import MetaFlags, { MetaFlagData } from './MetaFlags/MetaFlags';

const useStyles = makeStyles((theme: Theme) => ({
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
}));

export type BookStatsProps = {
  ratingString: string;
  metaData: MetaFlagData;
  bookId: number;
};

export const BookStats = ({
  ratingString,
  metaData,
  bookId,
}: BookStatsProps) => {
  const classes = useStyles();

  return (
    <div className={classes.metaData}>
      <div className={classes.ratings}>
        <Star htmlColor="#ffd54f" className={classes.star} />
        <Typography component="h1">{ratingString}</Typography>
      </div>

      <MetaFlags metaData={metaData} bookId={bookId} />
    </div>
  );
};
