import LayoutComponent from '../../../components/General/LayoutComponent';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { ProfileBookListItem } from './ProfileBookListItem/ProfileBookListItem';

const useStyles = makeStyles((theme) => ({
  list: {
    marginTop: theme.spacing(4),
    paddingLeft: '0px',
  },
}));

const ProfileBookList = (props) => {
  const classes = useStyles();

  const { books, listTitle, ...rest } = props;

  return (
    <LayoutComponent {...rest}>
      <Typography component="h2" variant="h5">
        {listTitle}
      </Typography>
      <ul className={classes.list}>
        {books.map((book, index) => (
          <ProfileBookListItem book={book} key={index} />
        ))}
      </ul>
    </LayoutComponent>
  );
};

export default ProfileBookList;
