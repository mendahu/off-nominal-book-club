import CommentsList from "./CommentsList";
import NewComment from "./NewComment";
import React, { useState } from "react";

export default function Comments(props) {
  const [comments, setComments] = useState(props.comments);

  function updateComments(comments) {
    setComments(comments);
  }

  return (
    <section>
      {props.joinedUsers.includes(props.userId) && (
        <NewComment
          readingId={props.readingId}
          setComments={updateComments}
          userId={props.userId}
        />
      )}
      <CommentsList comments={comments} />
    </section>
  );
}
