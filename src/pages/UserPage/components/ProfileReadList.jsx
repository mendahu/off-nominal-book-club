import LayoutComponent from '../General/LayoutComponent';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const ProfileReadList = (props) => {
  const classes = useStyles();

  const { books, ...rest } = props;

  return (
    <LayoutComponent {...rest}>
      <Typography>Read List</Typography>

      <ul>
        {books.map((book, index) => (
          <li key={index}>{book.title}</li>
        ))}
      </ul>
    </LayoutComponent>
  );
};

export default ProfileReadList;
