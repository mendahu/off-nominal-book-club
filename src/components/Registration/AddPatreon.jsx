import { 
  Typography, 
  Button, 
  CardContent } from '@material-ui/core'
import patreonAuthUrlGenerator from '../../../src/helpers/patreon/authUrlGenerator'
import ForwardIcon from '@material-ui/icons/Forward';
import axios from 'axios'
import { makeStyles } from "@material-ui/core/styles";

const patreonAuthOptions = {
  client_id: process.env.PAT_CLIENT_ID,
  redirect_uri: process.env.PAT_REDIRECT_URI
}

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

const handleSkip = () => {
  axios.post('/api/auth0/update', { result: "skipped" });
  //
}

export default function AddPatreon() {
  const classes = useStyles();

  return (
    <>
      <CardContent className={classes.contents}>
        <img src='/Patreon_White.png' alt="Patreon Logo" className={classes.patreonWordMark} />
      </CardContent>

      <CardContent>
        <Typography variant='body1'>Patrons of the WeMartians Podcast and Main Engine Cut Off Podcast have special privileges at the Off-Nominal Book Club. All Patrons can:</Typography>
        <ul>
          <Typography variant="body1" component='li'>Add books to the collection</Typography>
          <Typography variant="body1" component='li'>Rate books</Typography>
          <Typography variant="body1" component='li'>Review books</Typography>
        </ul>
      </CardContent>

      <CardContent className={classes.contents}>
        <Button className={classes.button} variant="contained" color="secondary" href={patreonAuthUrlGenerator(patreonAuthOptions)}>Connect your Patreon</Button>
        <Button className={classes.button} endIcon={<ForwardIcon />} size='small' variant="contained" color="default" onClick={handleSkip()}>Skip for now</Button>
      </CardContent>

      <CardContent>
        <Typography variant='caption' component='p'>Don't worry - free users can still browse the collection, mark books as read or favourites, and create wishlists.</Typography>
      </CardContent>

      <CardContent className={classes.contents}>
        <Typography variant='h5' paragraph>Not a patron?</Typography>
        <Typography variant='body1'>Consider supporting us for as little as $1/month. Not only do you get access to the premium features of Off-Nominal Book Club, but you support two independent content creators helping tell the story of space exploration. And there are perks, too!</Typography>
        <Button className={classes.button} variant="contained" color="secondary" href={'http://www.wemartians.com/support'}>Support WeMartians</Button>
        <Button className={classes.button} variant="contained" color="secondary" href={'http://www.mainenginecutoff.com/support'}>Support MECO</Button>
      </CardContent>
    </>
  );
}
