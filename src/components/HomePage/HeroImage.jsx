import { makeStyles, createStyles, createMuiTheme, responsiveFontSizes, ThemeProvider } from "@material-ui/core/styles";
import { Typography, Container } from '@material-ui/core'
import Head from 'next/head'

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      backgroundColor: "#dbcc9e",
      backgroundImage: "url('https://www.transparenttextures.com/patterns/paper-1.png')",
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5)
    },
    title: {
      fontFamily: "'Bree Serif', serif"
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
        <Typography variant="h1" gutterBottom='true' className={classes.title}>Bookpeople</Typography>
        <Typography variant="subtitle1">Find your people. Find your books.</Typography>
      </ThemeProvider>
    </Container>
  )
}

export default HeroImage;
