import {
  Avatar,
  Link,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import { BookThumbnail } from "../../../components/BookThumbnail";
import generateAuthorString from "../../../helpers/generateAuthorString";
import { ApiReadingBook, ApiReadingHost } from "../../../types/api/apiTypes";

const useStyles = makeStyles((theme: Theme) => ({
  headlineContainer: {
    padding: theme.spacing(1),
  },
  headerContainer: {
    marginTop: theme.spacing(2),
  },
  headerContentContainer: {
    display: "flex",
    alignItems: "stretch",
  },
  headerTextContainer: {
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
  },
  bookTextContainer: {
    flexGrow: 1,
  },
  hostContainer: {
    paddingTop: theme.spacing(1),
    display: "flex",
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
    <Paper className={classes.headerContainer}>
      <div className={classes.headlineContainer}>
        <Typography variant="h6" component="h1">
          Reading for...
        </Typography>
      </div>
      <div className={classes.headerContentContainer}>
        <BookThumbnail
          id={book.google_id}
          zoom={1}
          title={book.title}
          authorString={authorString}
        />
        <div className={classes.headerTextContainer}>
          <div className={classes.bookTextContainer}>
            <Typography variant="h5" component="h1">
              {book.title}
            </Typography>
            <Typography variant="body2" component="h2">
              By {authorString}
            </Typography>
          </div>
          <div>
            <Typography variant="body1" component="h2">
              Hosted by
            </Typography>
            <div className={classes.hostContainer}>
              <Link href={`/users/${host.id}`}>
                <Avatar alt={host.name} src={host.avatar} />
              </Link>
              <Link href={`/users/${host.id}`}>{host.name}</Link>
            </div>
          </div>
        </div>
      </div>
    </Paper>
  );
}
