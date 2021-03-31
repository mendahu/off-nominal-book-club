import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import generateAuthorString from "../../../helpers/generateAuthorString";
import { ApiReadingBook, ApiReadingHost } from "../../../types/api/apiTypes";
import urlGenerator from "../../../helpers/urlGenerator";
import { generateBookThumbnailUrl } from "../../../helpers/generateBookThumbnailUrl";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexWrap: "wrap",
  },
  media: {
    height: 200,
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  [theme.breakpoints.up(400)]: {
    media: {
      height: 300,
    },
  },
  [theme.breakpoints.up(500)]: {
    root: {
      flexWrap: "nowrap",
    },
    media: {
      height: 300,
      width: 220,
    },
    mediaContainer: {
      width: 220,
    },
  },
}));

export type ReadingHeaderProps = {
  book: ApiReadingBook;
  host: ApiReadingHost;
};

export default function ReadingHeader(props: ReadingHeaderProps) {
  const classes = useStyles();
  const router = useRouter();

  const { book, host } = props;
  const authorString = generateAuthorString(book.authors);

  const handleClick = () => {
    router.push(`/books/${urlGenerator(book.id, authorString, book.title)}`);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={handleClick} className={classes.mediaContainer}>
        <CardMedia
          component="img"
          className={classes.media}
          image={generateBookThumbnailUrl(book.google_id, 2)}
          title={book.title}
        />
      </CardActionArea>
      <div className={classes.cardContent}>
        <CardContent>
          <Typography component="p" variant="body2">
            Reading...
          </Typography>
          <Typography component="p" variant="h5">
            {book.title}
          </Typography>
          <Typography component="p" variant="subtitle1">
            by {authorString}
          </Typography>
        </CardContent>
        <CardHeader
          avatar={<Avatar alt={host.name} src={host.avatar} />}
          title={host.name}
          subheader="Host"
        ></CardHeader>
      </div>
    </Card>
  );
}
