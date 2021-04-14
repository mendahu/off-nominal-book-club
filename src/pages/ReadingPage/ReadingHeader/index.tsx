import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Link,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import generateAuthorString from "../../../helpers/generateAuthorString";
import { ApiReadingBook, ApiReadingHost } from "../../../types/api/apiTypes";
import urlGenerator from "../../../helpers/urlGenerator";
import { generateBookThumbnailUrl } from "../../../helpers/generateBookThumbnailUrl";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSnackbarContext } from "../../../contexts/SnackbarContext";

const useStyles = makeStyles((theme: Theme) => ({
  mediaContainer: {
    display: "inline-flex",
  },
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
    width: "100%",
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
  submitButton: {
    marginTop: theme.spacing(1),
  },
}));

export type ReadingHeaderProps = {
  book: ApiReadingBook;
  host: ApiReadingHost;
  description: {
    text: string;
    loading: boolean;
  };
  updateReading: (body: { description: string }) => Promise<void>;
  isOwner: boolean;
};

export default function ReadingHeader(props: ReadingHeaderProps) {
  const classes = useStyles();
  const router = useRouter();
  const triggerSnackbar = useSnackbarContext();

  const { book, host, updateReading, isOwner } = props;

  const [editMode, setEditMode] = useState(false);
  const [serverDescription, setServerDescription] = useState(
    props.description.text
  );
  const [descriptionField, setDescriptionField] = useState(
    serverDescription || "No description for this reading."
  );

  const authorString = generateAuthorString(book.authors);

  const handleClick = () => {
    router.push(`/books/${urlGenerator(book.id, authorString, book.title)}`);
  };

  const handleEdit = () => {
    if (
      editMode &&
      descriptionField !== serverDescription &&
      descriptionField.length
    ) {
      updateReading({ description: descriptionField })
        .then((res) => {
          setEditMode(false);
          setServerDescription(descriptionField);
        })
        .catch((err) => {
          triggerSnackbar({
            active: true,
            variant: "error",
            message: "Error updating the Reading description.",
          });
          setDescriptionField(serverDescription);
        });
    } else {
      setEditMode(!editMode);
      setDescriptionField(serverDescription);
    }
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
          <Typography component="p" variant="subtitle1" paragraph>
            by {authorString}
          </Typography>
          {editMode ? (
            <>
              <TextField
                id="description"
                label="Description"
                multiline
                defaultValue={descriptionField}
                value={descriptionField}
                fullWidth
                onChange={(event) => setDescriptionField(event.target.value)}
              />
              <Button
                variant="contained"
                className={classes.submitButton}
                color="primary"
                onClick={handleEdit}
                startIcon={
                  props.description.loading && (
                    <CircularProgress size={20} color="inherit" />
                  )
                }
              >
                {props.description.loading ? "Updating" : "Submit"}
              </Button>
            </>
          ) : (
            <Typography component="p" variant="body2">
              {descriptionField}
              {isOwner && <Link onClick={handleEdit}> [edit]</Link>}
            </Typography>
          )}
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
