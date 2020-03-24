import { 
  CardHeader,
  CardActions,
  Card, 
  CardContent, 
  CardMedia, 
  Typography,
  IconButton,
  Grid,
  Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Link from 'next/link'
import moment from 'moment'
import PeopleIcon from '@material-ui/icons/People';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import { spacing } from '@material-ui/system';


const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 334
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  button: {
    marginLeft: 'auto'
  }
}));

const CommunityItem = (props) => { 
  const classes = useStyles();

  const data = props.data

  const timeAgo = moment(data.created_at).fromNow()

  return (
    <Grid item>
      <Card className={classes.root}>

        <CardHeader 
          title={data.name}
          subheader={`Founded ${timeAgo}`}
          />

        <CardMedia 
          className={classes.media}
          image={data.img_url}
          title={data.name}
          />

        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p' nowrap="true">
            {data.desc}
          </Typography>
        </CardContent>

        <CardContent>
          <CardActions disableSpacing>
            <Typography >{data.members}</Typography>
            <IconButton>
              <PeopleIcon />
            </IconButton>
            <Typography>{data.books}</Typography>
            <IconButton>
              <ImportContactsIcon />
            </IconButton>
            <Link href={data.url}>
              <Button 
                className={classes.button}
                component='a'
                variant='contained' 
                color='secondary' 
                >
                  Visit
              </Button>
            </Link>
          </CardActions>
        </CardContent>

      </Card>
    </Grid>
  )
}

export default CommunityItem;