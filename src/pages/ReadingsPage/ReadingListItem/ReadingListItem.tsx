import { Avatar, Grid, Link, Typography } from "@material-ui/core";
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
    <LayoutComponent xs={12} sm={6} md={4}>
      <Grid container>
        <Grid item xs={12}>
          <Link href={`/readings/${props.readingId}`}>
            <BookThumbnail
              id={props.googleId}
              title={props.bookTitle}
              authorString={props.authorString}
            />
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Typography component="h2" variant="h4">
            <Link href={`/readings/${props.readingId}`}>{props.bookTitle}</Link>
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
