import { 
  Typography, 
  Button, 
  Checkbox,
  CardContent,
  FormControlLabel,
  TextField } from '@material-ui/core'
import { useState } from 'react'
import axios from 'axios'
import Router from 'next/router'
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  contents: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    margin: theme.spacing(6, 0, 2, 0)
  }
}));

export default function CompleteProfile({user}) {

  const classes = useStyles();

  const [ formData, setFormData ] = useState({
    name: "",
    bio: "",
  })
  const [ checked, setChecked ] = useState(false)

  const handleFormChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  const handleCheckbox = (e) => {
    setChecked(e.target.checked)
  }

  const submit = async () => {
    await axios.patch('/api/users/update', {...formData, gets_mail: checked})
    Router.replace("/");
  }

  return (
    <>
      <CardContent>
        <Typography 
          variant='h5'
          paragraph>Just a few more details...</Typography>
        <TextField 
          id="name" 
          label='Public display name'
          value={formData.name}
          margin='normal'
          onChange={handleFormChange}
          helperText='Displayed next your public reviews and on your public profile page' />
        <TextField 
          id="bio" 
          label='Public short bio' 
          multiline
          fullWidth
          margin='normal'
          rows={1}
          value={formData.bio}
          onChange={handleFormChange}
          helperText='Displayed on your public profile page' />
        <FormControlLabel 
          control={
            <Checkbox 
              id="gets_mail"
              checked={formData.gets_mail}
              onChange={handleCheckbox}
              color='primary' />}
          label="Send me occasional updates about the Off-Nominal Book Club via email."
        />
          
        <Button 
          variant="contained" 
          color="primary" 
          className={classes.button}
          onClick={submit}>Submit
        </Button>
      </CardContent>
    </>
  )
}