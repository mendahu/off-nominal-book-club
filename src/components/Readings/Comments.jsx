import CommentsList from "./CommentsList";
import React, { useState } from "react";
import NewComment from "../Readings/NewComment";
import Axios from "axios";

export default function Comments(props) {
  const [comments, setComments] = useState(props.comments);
  const [input, setInput] = useState("");

  function onInputChange() {
    setInput(event.target.value);
  }

  function clearInput() {
    setInput("");
  }

  function onSubmit() {
    Axios.post(`/api/readings/comments/${props.readingId}`, {
      comment: input,
      userId: props.userId
    })
      .then(() => {
        clearInput();
        return Axios.get(`/api/readings/${props.readingId}`);
      })
      .then(res => setComments(res.data.comments));
  }

  return (
    <section>
      {props.joinedUsers.includes(Number(props.userId)) && (
        <NewComment
          placeholderText={"Add a Comment"}
          buttonText={"POST"}
          input={input}
          onChange={onInputChange}
          onClick={event => {
            event.preventDefault();
            onSubmit();
          }}
        />
      )}
      {comments.length > 0 && <CommentsList comments={comments} />}
    </section>
  );
}
