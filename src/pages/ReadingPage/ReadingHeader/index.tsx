import {
  Avatar,
  Button,
  CircularProgress,
  Grid,
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
import Link from "next/link";
import urlGenerator from "../../../helpers/urlGenerator";

const useStyles = makeStyles((theme: Theme) => ({
  hostContainer: {
    display: "flex",
  },
  hostName: {
    marginLeft: theme.spacing(1),
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
  let isOwner = false;
  const [isDeleting, setIsDeleting] = useState(false);
  const triggerSnackbar = useSnackbarContext();

  const authorString = generateAuthorString(book.authors);

  const handleDelete = () => {
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

  if (!loading) {
    isOwner = Number(host.id) === user.onbc_id;
  }

  return (
    <LayoutComponent {...rest}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" component="h1">
            Reading for...
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <Link
            href={`/books/${urlGenerator(book.id, authorString, book.title)}`}
          >
            <a>
              <BookThumbnail
                id={book.google_id}
                zoom={3}
                title={book.title}
                authorString={authorString}
                width={"100%"}
              />
            </a>
          </Link>
        </Grid>
        <Grid item xs={12} sm={8} md={9}>
          <Typography variant="h5" component="h1">
            {book.title}
          </Typography>
          <Typography variant="body2" component="h2">
            By {authorString}
          </Typography>
        </Grid>
        <Grid container item xs={12} spacing={1}>
          <Grid item xs={12}>
            <Typography variant="body1" component="h2">
              Hosted by
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.hostContainer}>
              <Link href={`/users/${host.id}`}>
                <Avatar alt={host.name} src={host.avatar} />
              </Link>

              <Typography
                variant="h6"
                component="h2"
                className={classes.hostName}
              >
                <Link href={`/users/${host.id}`}>{host.name}</Link>
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            {isOwner && (
              <Button
                variant="contained"
                color="secondary"
                onClick={handleDelete}
                startIcon={
                  isDeleting && <CircularProgress color="inherit" size={20} />
                }
              >
                Cancel Reading
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </LayoutComponent>
  );
}
