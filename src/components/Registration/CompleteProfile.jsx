import { Typography, Button, TextField } from '@material-ui/core'
import { useState } from 'react'
import axios from 'axios'
import Layout from '../DefaultLayout'
import Router from 'next/router'

export default function CompleteProfile() {

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
    <Layout>
      <Typography>Just a few more details.</Typography>
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
    </Layout>
  )
}