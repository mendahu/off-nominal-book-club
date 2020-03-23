import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer } from
"mdbreact";
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles';
import { 
  Container,
  Card,
  CardMedia,
  CardContent } from '@material-ui/core';


const useStyles = makeStyles({
  root: {
    display: "flex",
    width: '100%'
  },
  content: {
    flexGrow: 1
  }
});

export default function HeroCarousel(props) {

  const classes = useStyles();

  const carouselItems = [
    { ...props.randomBook, headline: "Try a random book!" },
    { ...props.mostFavBook, headline: "Community Favourite" },
    { ...props.highestRatedBook, headline: "Community's Highest Rated" },
  ]

  return (
    <MDBContainer>
      <MDBCarousel
        activeItem={1}
        length={3}
        showControls={false}
        showIndicators={false}
        className="z-depth-1"
      >
        <MDBCarouselInner>
          {carouselItems.map((item, index) => (
            <Container component="main" maxWidth={false}>
              <MDBCarouselItem itemId={index + 1}>
                <MDBView>
                  <Card className={classes.root}>
                    <Link href={`books/${item.id}`}>
                      <a>
                        <div className={classes.root}>
                          <CardMedia 
                            component="img"
                            alt={item.title}
                            image={item.image_url}
                            title={item.title}
                            />
                          <CardContent className={classes.content}>
                                <div
                                  className="w-100"
                                  >
                                  <h1>{item.headline}</h1>
                                  <h2>{item.title}</h2>
                                  {JSON.parse(item.authors).map(author => <h3>{author}</h3>)}
                                </div>
                          </CardContent>
                        </div>
                      </a>
                    </Link>
                  </Card>
                </MDBView>
              </MDBCarouselItem>
            </Container>
          ))}
        </MDBCarouselInner>
      </MDBCarousel>
    </MDBContainer>
  )
}