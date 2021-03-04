import {
  Avatar,
  Button,
  CircularProgress,
  Link,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { useBookClubUser } from "../../../../lib/bookClubUser";
import { BookThumbnail } from "../../../components/BookThumbnail";
import LayoutComponent from "../../../components/General/LayoutComponent";
import { useSnackbarContext } from "../../../contexts/SnackbarContext";
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
  deleteReading: () => Promise<boolean>;
};

export default function ReadingHeader(props: ReadingHeaderProps) {
  const classes = useStyles();
  const { user, loading } = useBookClubUser();
  const { book, host, deleteReading, ...rest } = props;
  const isOwner = Number(host.id) === user.onbc_id;
  const [isDeleting, setIsDeleting] = useState(false);
  const triggerSnackbar = useSnackbarContext();

  const authorString = generateAuthorString(book.authors);

  const delReading = () => {
    setIsDeleting(true);
    deleteReading().catch((err) => {
      setIsDeleting(false);
      triggerSnackbar({
        active: true,
        variant: "error",
        message: "Error deleting the Reading.",
      });
    });
  };

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
            {isOwner && (
              <Button
                variant="contained"
                color="secondary"
                onClick={delReading}
                startIcon={
                  isDeleting && <CircularProgress color="inherit" size={20} />
                }
              >
                Cancel Reading
              </Button>
            )}
          </div>
        </div>
      </div>
    </LayoutComponent>
  );
}
