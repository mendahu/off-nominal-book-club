import { 
  makeStyles, 
  createStyles, 
  createMuiTheme, 
  responsiveFontSizes, 
  ThemeProvider } from "@material-ui/core/styles";
import { 
  Typography, 
  Container,
  Grid } from '@material-ui/core'
import Head from 'next/head'
import ImportContactsIcon from '@material-ui/icons/ImportContacts';

const useStyles = makeStyles(theme => ({
    root: {
      backgroundColor: theme.palette.grey['900'],
      backgroundImage: "url('https://www.transparenttextures.com/patterns/light-paper-fibers.png')",
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8)
    },
    title: {
      fontFamily: "'Bree Serif', serif"
    },
    icon: {
      fontSize: '150px',
      [theme.breakpoints.down('sm')]: {
        fontSize: '120px',
      }
    }
  }));

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const HeroImage = () => {
  const classes = useStyles();

  return (
    <Container maxWidth={false} component="section" className={classes.root}>
      <Head>
        <link href="https://fonts.googleapis.com/css?family=Bree+Serif&display=swap" rel="stylesheet" />
      </Head>
      <ThemeProvider theme={theme}>
        <Grid container justify="space-between" direction='row-reverse'>
          <Grid item>
            <ImportContactsIcon className={classes.icon}/>
          </Grid>
          <Grid item>
            <Typography variant="h1" gutterBottom={true} className={classes.title}>Bookpeople</Typography>
            <Typography variant="subtitle1">Find your people. Find your books.</Typography>
          </Grid>
        </Grid>
      </ThemeProvider>
    </Container>
  )
}

export default HeroImage;
