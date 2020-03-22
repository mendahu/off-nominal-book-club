import { Paper, Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Link from 'next/link'
import moment from 'moment'


const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "row",
    marginTop: "1vh",
    height: "15vh"
  },
  imageContainer: {
    display: "flex",
    width: "17%",
    padding: 0
  },
  thumb_image: {
    margin: "auto",
    height: "13vh"
  },
  row: {
    display: "flex",
    flexDirection: "row",
    padding: "0",
    justifyContent: "flex-end"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "78%"
  },
  title: {
    width: "90%",
    fontSize: "2.25vh"
  }
}));

const CommunityItem = (props) => { 
  const classes = useStyles();

  const data = props.data

  const timeAgo = moment(data.created_at).fromNow()

  return (
    <Paper>
      <Card className={classes.root}>

      <CardContent className={classes.imageContainer}>
        <CardMedia className={classes.thumb_image}>
        <Link href={data.url}>
          <a>
            <img className={classes.thumb_image} src={data.img_url} width="150px"/>
          </a>
        </Link>
        </CardMedia>
      </CardContent>
      <CardContent className={classes.content}>
        <CardContent className={classes.row}>
          <Typography className={classes.title} component='h3' variant='h3'>
            <Link href={data.url}>
              <a>{data.name}</a>
            </Link>
          </Typography>
          <Typography className={classes.rating}>
            <span>{data.members} members</span>
          </Typography>
          <Typography className={classes.rating}>
            <span>{data.books} books</span>
          </Typography>
        </CardContent>
        <CardContent className={classes.row}>
          <Typography>
            <p>{data.desc}</p>
          </Typography>
        </CardContent>
          <Typography>
            Founded {timeAgo}
          </Typography>
      </CardContent>
      </Card>
    </Paper>
  )
}

export default CommunityItem;