import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBView,
  MDBContainer,
} from 'mdbreact';
import Link from 'next/link';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, Button, Typography, CircularProgress } from '@material-ui/core';
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@material-ui/core/styles';
import { useCarousel } from './useCarousel';
import clsx from 'clsx';
import { generateBookThumbnailUrl } from '../../../helpers/generateBookThumbnailUrl';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(6, 3, 6, 0),
    height: '350px',
    backgroundColor: theme.palette.grey['900'],
    backgroundImage:
      "url('https://www.transparenttextures.com/patterns/light-paper-fibers.png')",
  },
  coverContainer: {
    position: 'absolute',
    left: '0',
    height: '100%',
    zIndex: -1,
  },
  cover: {
    transform: 'rotate(-7deg)',
    margin: theme.spacing(3, 3, 3, 6),
  },
  carouselTextContainer: {
    textShadow: `2px 2px 8px ` + theme.palette.grey['900'],
    height: '100%',
  },
  button: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
}));

export const Carousel = () => {
  const classes = useStyles();

  const { carouselItems, loading } = useCarousel();

  return (
    <MDBContainer className={classes.root}>
      {loading ? (
        <div className={classes.loadingContainer}>
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <MDBCarousel
          activeItem={1}
          length={carouselItems.length}
          showControls={false}
          showIndicators={false}
          className={clsx('z-depth-1', classes.carouselTextContainer)}
        >
          <MDBCarouselInner>
            {carouselItems.map((item, index) => (
              <MDBCarouselItem itemId={index + 1} key={index}>
                <MDBView>
                  <Grid className={classes.coverContainer} container>
                    <Grid
                      className={classes.coverContainer}
                      alignItems="center"
                      container
                    >
                      <Grid item>
                        <img
                          src={generateBookThumbnailUrl(item.google_id, 1)}
                          alt={item.title}
                          className={classes.cover}
                        />
                      </Grid>
                    </Grid>
                    <ThemeProvider theme={theme}>
                      <Grid
                        className={classes.carouselTextContainer}
                        justify="space-around"
                        alignItems="flex-end"
                        direction="column"
                        container
                      >
                        <Grid item>
                          <Typography align="right" variant="h4" component="h1">
                            {item.headline}
                          </Typography>
                          <Typography
                            gutterBottom={true}
                            align="right"
                            variant="h6"
                            component="h2"
                          >
                            {item.subline}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Link
                            href={`/books/[id]`}
                            as={`/books/${item.slug}`}
                            passHref
                          >
                            <Button
                              size="large"
                              component="a"
                              className={classes.button}
                              variant="contained"
                            >
                              Check it Out
                            </Button>
                          </Link>
                        </Grid>
                        <Grid item>
                          <Typography align="right" variant="h5" component="h2">
                            {item.title}
                          </Typography>
                          <Typography
                            align="right"
                            variant="overline"
                            component="h3"
                            key={index}
                          >
                            {item.authorString}
                          </Typography>
                        </Grid>
                      </Grid>
                    </ThemeProvider>
                  </Grid>
                </MDBView>
              </MDBCarouselItem>
            ))}
          </MDBCarouselInner>
        </MDBCarousel>
      )}
    </MDBContainer>
  );
};

export default Carousel;
