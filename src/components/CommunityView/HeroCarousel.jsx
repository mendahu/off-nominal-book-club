import { 
  MDBCarousel, 
  MDBCarouselInner, 
  MDBCarouselItem, 
  MDBView, 
  MDBContainer } from "mdbreact";
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles';
import { 
  Box,
  Grid,
  Button,
  Typography } from '@material-ui/core';
import urlGenerator from '../../helpers/urlGenerator'
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(6, 3, 6, 0),
    height: '350px',
    backgroundColor: theme.palette.grey['900'],
    backgroundImage: "url('https://www.transparenttextures.com/patterns/light-paper-fibers.png')",
  },
  coverContainer: {
    position: 'absolute',
    left: '0',
    height: '100%',
    zIndex: '-1'
  },
  cover: {
    transform: "rotate(-7deg)",
    margin: theme.spacing(3, 3, 3, 6),
  },
  carouselTextContainer: {
    height: '100%'
  },
  button: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  }
}));

export default function HeroCarousel(props) {

  const classes = useStyles();

  const carouselItems = [
    { ...props.randomBook, headline: "Try a random book!", subline: "Chosen from our collection" },
    { ...props.mostFavBook, headline: "Community Favourite", subline: "The community's favourite this month" },
    { ...props.highestRatedBook, headline: "Community's Highest Rated", subline: "Best rated this month" },
  ]

  return (
    <MDBContainer className={classes.root}>
      <MDBCarousel
        activeItem={1}
        length={3}
        showControls={false}
        showIndicators={false}
        className="z-depth-1"
        className={classes.carouselTextContainer}
      >
        <MDBCarouselInner>

          {carouselItems.map((item, index) => (
            <MDBCarouselItem itemId={index + 1} key={index}>
              <MDBView>

            <Grid className={classes.coverContainer} container>

              <Grid className={classes.coverContainer} alignItems='center' container>
                <Grid item>
                  <img src={item.image_url} alt={item.title} className={classes.cover}/>
                </Grid>
              </Grid>

            <ThemeProvider theme={theme}>
              <Grid className={classes.carouselTextContainer} justify='space-around' alignItems='flex-end' direction='column' container mr={2}>
                <Grid item>
                  <Typography align="right" variant='h4' componet="h1">{item.headline}</Typography>
                  <Typography gutterBottom={true} align="right"  variant='h6' componet="h2">{item.subline}</Typography>
                </Grid>
                <Grid item>
                  <Link href={`/books/[id]`} as={`/books/${urlGenerator(item.id, JSON.parse(item.authors).join(", "), item.title)}`} passHref>
                    <Button 
                      size='large'
                      component='a'
                      className={classes.button}
                      variant="contained">
                        Check it Out
                    </Button>
                  </Link>
                </Grid>
                <Grid item>
                  <Typography align="right"  variant='h5' componet="h2">{item.title}</Typography>
                  {JSON.parse(item.authors).map((author, index) => <Typography align="right"  variant='overline' component='h3' key={index}>{author}</Typography>)}
                </Grid>
              </Grid>
            </ThemeProvider>

            </Grid>

              </MDBView>
            </MDBCarouselItem>
          ))}

        </MDBCarouselInner>
      </MDBCarousel>
    </MDBContainer>
  )
}