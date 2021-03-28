import {
  Avatar,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { generateBookThumbnailUrl } from "../../../helpers/generateBookThumbnailUrl";
import MatLink from "@material-ui/core/Link";
import Link from "next/link";
import truncateTitle from "../../../helpers/titleTruncator";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 200,
  },
  card: {
    display: "flex",
    alignItems: "stretch",
  },
  media: {
    height: 200,
    width: 130,
    flex: "0 0 auto",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  hostContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1),
  },
  titleContainer: {},
  hostName: {
    marginLeft: theme.spacing(1),
  },
}));

export type ReadingListItemProps = {
  bookId: string;
  bookTitle: string;
  authorString: string;
  readingId: string;
  googleId: string;
  hostName: string;
  hostAvatar: string;
};

export default function ReadingListItem(props: ReadingListItemProps) {
  const classes = useStyles();

  return (
    <Grid item xs={12} lg={4} md={6}>
      <Tooltip title={props.bookTitle} arrow>
        <Card className={classes.root}>
          <CardActionArea>
            <Link href={`/readings/${props.readingId}`} passHref>
              <MatLink
                color="inherit"
                underline="none"
                className={classes.card}
              >
                <CardMedia
                  className={classes.media}
                  image={generateBookThumbnailUrl(props.googleId, 1)}
                  title={"Test"}
                />
                <div className={classes.details}>
                  <div className={classes.titleContainer}>
                    <Typography component="p" variant="h5">
                      {truncateTitle(props.bookTitle, 20)}
                    </Typography>
                    <Typography component="p" variant="subtitle1">
                      by {props.authorString}
                    </Typography>
                  </div>
                  <div>
                    <div className={classes.hostContainer}>
                      <Avatar alt={props.hostName} src={props.hostAvatar} />
                      <Typography
                        component="p"
                        variant="body2"
                        className={classes.hostName}
                      >
                        {props.hostName}
                      </Typography>
                    </div>
                  </div>
                </div>
              </MatLink>
            </Link>
          </CardActionArea>
        </Card>
      </Tooltip>
    </Grid>
  );
}
