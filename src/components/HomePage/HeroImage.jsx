import { makeStyles, createStyles, createMuiTheme, responsiveFontSizes, ThemeProvider } from "@material-ui/core/styles";
import { Typography, Box } from '@material-ui/core'

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      padding: theme.spacing(3, 0)
    }
  }));

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const HeroImage = () => {
  const classes = useStyles();

  return (
    <Box component="section" className={classes.root}>
      <ThemeProvider theme={theme}>
        <Typography variant="h1" gutterBottom='true'>Bookpeople</Typography>
        <Typography variant="subtitle1">Find your people. Find your books.</Typography>
      </ThemeProvider>
    </Box>
  )
}

export default HeroImage;