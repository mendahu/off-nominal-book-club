import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBView,
  MDBContainer,
} from 'mdbreact';
import Link from 'next/link';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, Button, Typography } from '@material-ui/core';
import urlGenerator from '../../../helpers/urlGenerator';
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@material-ui/core/styles';
import { useCarousel } from './useCarousel/useCarousel';
import clsx from 'clsx';

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
}));

export const Carousel = () => {
  const classes = useStyles();

  const { carouselItems, loading } = useCarousel();

  return (
    <MDBContainer className={classes.root}>
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
                        src={item.thumbnail}
                        alt={item.title}
                        className={classes.cover}
                      />
                    </Grid>
                  </Grid>

                  {/* <ThemeProvider theme={theme}>
                    <Grid
                      className={classes.carouselTextContainer}
                      justify="space-around"
                      alignItems="flex-end"
                      direction="column"
                      container
                      mr={2}
                    >
                      <Grid item>
                        <Typography align="right" variant="h4" componet="h1">
                          {item.headline}
                        </Typography>
                        <Typography
                          gutterBottom={true}
                          align="right"
                          variant="h6"
                          componet="h2"
                        >
                          {item.subline}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Link
                          href={`/books/[id]`}
                          as={`/books/${urlGenerator(
                            item.id,
                            JSON.parse(item.authors).join(', '),
                            item.title
                          )}`}
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
                        <Typography align="right" variant="h5" componet="h2">
                          {item.title}
                        </Typography>
                        {JSON.parse(item.authors).map((author, index) => (
                          <Typography
                            align="right"
                            variant="overline"
                            component="h3"
                            key={index}
                          >
                            {author}
                          </Typography>
                        ))}
                      </Grid>
                    </Grid>
                  </ThemeProvider> */}
                </Grid>
              </MDBView>
            </MDBCarouselItem>
          ))}
        </MDBCarouselInner>
      </MDBCarousel>
    </MDBContainer>
  );
};

export default Carousel;
