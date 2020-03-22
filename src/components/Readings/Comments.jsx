import CommentsList from "./CommentsList";
import NewComment from "./NewComment";

export default function Comments(props) {
  return (
    <section>
      <NewComment />
      <CommentsList comments={props.comments} />
    </section>
  );
}
