import { 
  Typography, 
  Button, 
  CardContent,
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
    margin: theme.spacing(2, 0, 0, 0)
  },
  patreonWordMark: {
    width: "80%",
    margin: theme.spacing(2, 0, 2, 0)
  }
}));

export default function CompleteProfile() {

  const classes = useStyles();

  const [ formData, setFormData ] = useState({
    name: "",
    bio: ""
  })

  const handleFormChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  const submit = () => {
    axios.patch('/api/users/update', formData)
      .then(() => {
        Router.replace("/");
      })
  }

  return (
    <>
      <CardContent className={classes.content}>
        <Typography>Just a few more details...</Typography>
          <TextField 
            id="name" 
            label='Public display name'
            value={formData.name}
            onChange={handleFormChange}
            helperText='Displayed next your public reviews and on your public profile page' />
          <TextField 
            id="bio" 
            label='Public short bio' 
            multiline
            rows={3}
            value={formData.bio}
            onChange={handleFormChange}
            helperText='Displayed on your public profile page' />
        <Button variant="contained" color="primary" href={'/'} onClick={submit}>Submit</Button>
      </CardContent>
    </>
  )
}