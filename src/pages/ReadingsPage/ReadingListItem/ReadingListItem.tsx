import { Avatar, Grid, Typography } from "@material-ui/core";
import { BookThumbnail } from "../../../components/BookThumbnail";
import LayoutComponent from "../../../components/General/LayoutComponent";

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
  return (
    <LayoutComponent xs={12}>
      <Grid container>
        <Grid item xs={12}>
          <BookThumbnail
            id={props.googleId}
            title={props.bookTitle}
            authorString={props.authorString}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography component="h2" variant="h4">
            {props.bookTitle}
          </Typography>
          <Typography component="h3" variant="body1">
            by {props.authorString}
          </Typography>
          <Avatar alt={props.hostName} src={props.hostAvatar} />
          <Typography component="h3" variant="body1">
            Hosted by {props.hostName}
          </Typography>
        </Grid>
      </Grid>
    </LayoutComponent>
  );
}
