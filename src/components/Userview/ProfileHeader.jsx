import LayoutComponent from '../General/LayoutComponent';
import {
  Typography,
  Link,
  FormControl,
  TextField,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { useProfileUpdater } from '../../hooks/useProfileUpdater';

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: 'auto',
  },
  link: {
    fontSize: '1rem',
  },
}));

const ProfileHeader = ({ name, bio, ...rest }) => {
  const classes = useStyles();

  const [editMode, setEditMode] = useState(false);
  const { formData, handleFormChange, updateProfile } = useProfileUpdater({
    name,
    bio,
  });

  const clickHandler = () => {
    if (editMode) {
      updateProfile();
    }
    setEditMode(!editMode);
  };

  const staticDisplay = (
    <>
      <Typography variant="h3" component="h1" className={classes.title}>
        {formData.name}{' '}
        <Link className={classes.link} onClick={clickHandler}>
          [edit]
        </Link>
      </Typography>
      <Typography variant="body1" component="p">
        {formData.bio}
      </Typography>
    </>
  );

  const editableDisplay = (
    <FormControl>
      <TextField
        id="name"
        label="Public display name"
        value={formData.name}
        onChange={handleFormChange}
        margin="normal"
        helperText="Displayed next your public reviews and on your public profile page"
      />
      <TextField
        id="bio"
        label="Public short bio"
        multiline
        fullWidth
        margin="normal"
        rows={1}
        value={formData.bio}
        onChange={handleFormChange}
        helperText="Displayed on your public profile page"
      />
      <Button variant="contained" color="primary" onClick={clickHandler}>
        Submit
      </Button>
    </FormControl>
  );

  return (
    <LayoutComponent {...rest} flexbox="col" fullHeight={true}>
      {editMode ? editableDisplay : staticDisplay}
    </LayoutComponent>
  );
};

export default ProfileHeader;
