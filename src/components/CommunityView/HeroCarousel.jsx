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


const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(6, 0)
  },
  cover: {
    transform: "rotate(-7deg)",
    margin: theme.spacing(3, 3, 3, 6)
  },
  carouselTextContainer : {
    position: 'absolute',
    height: '100%',
    marginRight: theme.spacing(6),
    right: '0',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'right',
    justifyContent: 'space-around'
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
      >
        <MDBCarouselInner>

          {carouselItems.map((item, index) => (
            <MDBCarouselItem itemId={index + 1} key={index}>
              <MDBView>

            <Grid container>
              <Grid>
                <img src={item.image_url} alt={item.title} className={classes.cover}/>
              </Grid>
              <Grid>
                <Box className={classes.carouselTextContainer}>
                  <Typography variant='h4' componet="h1">{item.headline}</Typography>
                  <Typography variant='h6' componet="h2">{item.subline}</Typography>
                  <Button 
                    size='large' 
                    href={`/books/${item.id}`} 
                    variant="contained" 
                    color="secondary">
                      Check it Out
                  </Button>
                  <Typography variant='h5' componet="h2">{item.title}</Typography>
                  {JSON.parse(item.authors).map((author, index) => <Typography variant='overline' component='h3' key={index}>{author}</Typography>)}
                </Box>
              </Grid>
            </Grid>

              </MDBView>
            </MDBCarouselItem>
          ))}

        </MDBCarouselInner>
      </MDBCarousel>
    </MDBContainer>
  )
}