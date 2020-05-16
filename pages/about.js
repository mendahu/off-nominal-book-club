import Layout from '../src/components/DefaultLayout';
import {
  Grid,
  Paper,
  Typography,
  Link,
  Button,
  CardContent,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TwitterFollowButton } from 'react-twitter-embed';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(4, 2, 2, 2),
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    margin: theme.spacing(2, 0, 2, 0),
  },
  profile: {
    width: '100%',
    margin: theme.spacing(2, 0, 2, 0),
    borderRadius: '15px',
    maxWidth: '400px',
  },
}));

export default function About() {
  const classes = useStyles();

  return (
    <Layout>
      <Grid container space={2} className={classes.root}>
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <Paper>
            <CardContent className={classes.content}>
              <Typography variant="h5" component="h1" paragraph>
                The Off-Nominal Book Club
              </Typography>
              <Typography variant="body1" component="p" paragraph>
                The Off-Nominal Book Club is a community space conceived by{' '}
                <i>The Anomalies</i>, a group of space enthusiasts and podcast
                listeners for the Off-Nominal network of radio shows,{' '}
                <Link
                  href="http://www.mainenginecutoff.com"
                  target="_blank"
                  rel="noopener"
                >
                  Main Engine Cut Off
                </Link>
                ,{' '}
                <Link
                  href="http://www.wemartians.com"
                  target="_blank"
                  rel="noopener"
                >
                  WeMartians
                </Link>
                , and the titular{' '}
                <Link
                  href="http://www.offnominal.space"
                  target="_blank"
                  rel="noopener"
                >
                  Off-Nominal
                </Link>
                .
              </Typography>
              <TwitterFollowButton
                screenName="OffNom"
                options={{ size: 'large', showCount: false }}
              />
              <TwitterFollowButton
                screenName="WeHaveMECO"
                options={{ size: 'large', showCount: false }}
              />
              <TwitterFollowButton
                screenName="We_Martians"
                options={{ size: 'large', showCount: false }}
              />
              <Typography variant="body1" component="p" paragraph>
                Our goal is to create the best repository of space-related books
                so that space enthusiasts around the world can continue learning
                new things and exploring the universe together.
              </Typography>
              <Typography variant="body1" component="p" paragraph>
                You can help support this effort, and all the space content we
                produce, by becoming patrons of Anthony and/or Jake for as
                little as $1/month.
              </Typography>
              <Button
                className={classes.button}
                variant="contained"
                color="secondary"
                href={'http://www.wemartians.com/support'}
                size="large"
                target="_blank"
              >
                Support Jake
              </Button>
              <Button
                className={classes.button}
                variant="contained"
                color="secondary"
                href={'http://www.mainenginecutoff.com/support'}
                size="large"
                target="_blank"
              >
                Support Anthony
              </Button>
              <Typography variant="h5" component="h1" paragraph>
                The Hosts
              </Typography>
              <img
                src="https://pbs.twimg.com/profile_images/1199552790541946880/8amz5UPa_400x400.jpg"
                className={classes.profile}
              />
              <TwitterFollowButton
                screenName="JakeOnOrbit"
                options={{ size: 'large', showCount: false }}
              />
              <Typography variant="body1" component="p" paragraph>
                Jake Robins is a space enthusiast, podcaster and web developer
                from Vancouver, British Columbia. He hosts the WeMartians
                Podcast and co-hosts Off-Nominal with Anthony.
              </Typography>
              <img
                src="https://pbs.twimg.com/profile_images/1059935361693028352/GiR2lwgk_400x400.jpg"
                className={classes.profile}
              />
              <TwitterFollowButton
                screenName="acolangelo"
                options={{ size: 'large', showCount: false }}
              />
              <Typography variant="body1" component="p" paragraph>
                Anthony Colangelo is a space enthusiast, podcaster, blogger and
                developer from Philadelphia, Pennsylvania. He hosts the Main
                Engine Cut Off Podcast and co-hosts Off-Nominal with Jake.
              </Typography>
            </CardContent>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
}
