import {
  Avatar,
  Button,
  Link,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { BookThumbnail } from "../../../components/BookThumbnail";
import LayoutComponent from "../../../components/General/LayoutComponent";
import generateAuthorString from "../../../helpers/generateAuthorString";
import { ApiReadingBook, ApiReadingHost } from "../../../types/api/apiTypes";

const useStyles = makeStyles((theme: Theme) => ({
  headlineContainer: {
    padding: theme.spacing(1),
  },
  headerContentContainer: {
    display: "flex",
    alignItems: "stretch",
    flexWrap: "wrap",
  },
  headerTextContainer: {
    paddingTop: theme.spacing(2),
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
  deleteReading: () => void;
};

export default function ReadingHeader(props: ReadingHeaderProps) {
  const classes = useStyles();
  const { book, host, ...rest } = props;

  const authorString = generateAuthorString(book.authors);

  return (
    <LayoutComponent {...rest}>
      <div className={classes.headlineContainer}>
        <Typography variant="h6" component="h1">
          Reading for...
        </Typography>
      </div>
      <div className={classes.headerContentContainer}>
        <BookThumbnail
          id={book.google_id}
          zoom={2}
          title={book.title}
          authorString={authorString}
          width="100%"
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
            <Button
              variant="contained"
              color="secondary"
              onClick={props.deleteReading}
            >
              Cancel Reading
            </Button>
          </div>
        </div>
      </div>
    </LayoutComponent>
  );
}
