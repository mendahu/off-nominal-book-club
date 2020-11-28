import { Chip, Paper, Typography, makeStyles, Avatar } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import { BookType } from '../../../types/common.d';
import { BookFilters } from '../useSearch/useSearch';

const useStyles = makeStyles((theme) => ({
  filterContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export type SearchFiltersProps = {
  filters: BookFilters;
  setFilter: (type: BookType) => void;
};

export const SearchFilters = ({ filters, setFilter }: SearchFiltersProps) => {
  const classes = useStyles();

  return (
    <Paper>
      <div className={classes.filterContainer}>
        <Chip
          size="small"
          label="Fiction"
          clickable
          onClick={() => setFilter(BookType.fiction)}
          avatar={
            <Avatar>
              {filters.showFiction ? (
                <DoneIcon fontSize="small" />
              ) : (
                <NotInterestedIcon fontSize="small" />
              )}
            </Avatar>
          }
          color={filters.showFiction ? 'primary' : 'default'}
          className={classes.chip}
        />
        <Chip
          size="small"
          label="Non-Fiction"
          clickable
          onClick={() => setFilter(BookType.nonFiction)}
          avatar={
            <Avatar>
              {filters.showNonFiction ? (
                <DoneIcon fontSize="small" />
              ) : (
                <NotInterestedIcon fontSize="small" />
              )}
            </Avatar>
          }
          color={filters.showNonFiction ? 'primary' : 'default'}
          className={classes.chip}
        />
        <Chip
          size="small"
          label="Textbook/Reference"
          clickable
          onClick={() => setFilter(BookType.textbook)}
          avatar={
            <Avatar>
              {filters.showTextbook ? (
                <DoneIcon fontSize="small" />
              ) : (
                <NotInterestedIcon fontSize="small" />
              )}
            </Avatar>
          }
          color={filters.showTextbook ? 'primary' : 'default'}
          className={classes.chip}
        />
      </div>
    </Paper>
  );
};

export default SearchFilters;
