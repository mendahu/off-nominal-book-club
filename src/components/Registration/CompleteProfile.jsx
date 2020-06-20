import {
  Typography,
  Button,
  Checkbox,
  CardContent,
  FormControl,
  FormControlLabel,
  RadioGroup,
  TextField,
  Radio,
  Avatar,
  Grid,
} from '@material-ui/core';
import { useState } from 'react';
import Router from 'next/router';
import { makeStyles } from '@material-ui/core/styles';

import { useProfileUpdater } from '../../hooks/useProfileUpdater';

const useStyles = makeStyles((theme) => ({
  contents: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    width: '10vh',
    height: '10vh',
    margin: 'auto',
  },
  button: {
    margin: theme.spacing(6, 0, 2, 0),
  },
}));

export default function CompleteProfile(props) {
  const classes = useStyles();
  const { user } = props;

  const { formData, handleFormChange, updateProfile } = useProfileUpdater({
    name: '',
    bio: '',
    avatar_select: 'patreon',
    gets_mail: false,
  });

  const handleSubmit = () => {
    updateProfile();
    Router.replace('/');
  };

  return (
    <>
      <CardContent>
        <FormControl>
          <Typography variant="h5" paragraph>
            Just a few more details...
          </Typography>
          <RadioGroup
            id="avatar_select"
            aria-label="avatar"
            name="avatar"
            value={formData.avatar_select}
            onChange={handleFormChange}
          >
            <Grid container spacing={2} justify="center">
              <Grid item xs={4}>
                <Avatar
                  className={classes.avatar}
                  alt={'Gravatar'}
                  src={user.gravatar_avatar_url}
                />
                <Typography align="center">
                  <FormControlLabel
                    value="gravatar"
                    control={<Radio />}
                    label="Use Gravatar"
                  />
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Avatar
                  className={classes.avatar}
                  alt={'Patreon Profile Picture'}
                  src={user.patreon_avatar_url}
                />
                <Typography align="center">
                  <FormControlLabel
                    value="patreon"
                    control={<Radio />}
                    label="Use Patreon"
                  />
                </Typography>
              </Grid>
            </Grid>
          </RadioGroup>
          <TextField
            id="name"
            label="Public display name"
            value={formData.name}
            margin="normal"
            onChange={handleFormChange}
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
          <FormControlLabel
            control={
              <Checkbox
                id="gets_mail"
                checked={formData.gets_mail}
                onChange={handleFormChange}
                color="primary"
              />
            }
            label="Send me occasional updates about the Off-Nominal Book Club via email."
          />

          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </FormControl>
      </CardContent>
    </>
  );
}
