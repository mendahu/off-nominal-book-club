import {
  Avatar,
  Card,
  CardMedia,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import generateAuthorString from "../../../helpers/generateAuthorString";
import { ApiReadingBook, ApiReadingHost } from "../../../types/api/apiTypes";
import Link from "next/link";
import urlGenerator from "../../../helpers/urlGenerator";
import MatLink from "@material-ui/core/Link";
import { generateBookThumbnailUrl } from "../../../helpers/generateBookThumbnailUrl";

const useStyles = makeStyles((theme: Theme) => ({
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

export type ReadingHeaderProps = {
  book: ApiReadingBook;
  host: ApiReadingHost;
};

export default function ReadingHeader(props: ReadingHeaderProps) {
  const classes = useStyles();

  const { book, host } = props;
  const authorString = generateAuthorString(book.authors);

  return (
    <Grid item xs={12}>
      <Card className={classes.root}>
        <Link
          href={`/books/${urlGenerator(book.id, authorString, book.title)}`}
          passHref
        >
          <MatLink color="inherit" underline="none" className={classes.card}>
            <CardMedia
              className={classes.media}
              image={generateBookThumbnailUrl(book.google_id, 1)}
              title={"Test"}
            />
            <div className={classes.details}>
              <div className={classes.titleContainer}>
                <Typography component="p" variant="h5">
                  {book.title}
                </Typography>
                <Typography component="p" variant="subtitle1">
                  by {authorString}
                </Typography>
              </div>
              <div>
                <div className={classes.hostContainer}>
                  <Avatar alt={host.name} src={host.avatar} />
                  <Typography
                    component="p"
                    variant="body2"
                    className={classes.hostName}
                  >
                    {host.name}
                  </Typography>
                </div>
              </div>
            </div>
          </MatLink>
        </Link>
      </Card>
    </Grid>
  );
}
