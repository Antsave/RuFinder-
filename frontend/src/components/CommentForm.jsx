import React, { useState } from "react";

export default function CommentForm({ onCommentSubmit }) {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return; // ignore empty comments
    onCommentSubmit(comment);
    setComment(""); // clear input
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        style={styles.input}
      />
      <button type="submit" style={styles.button}>
        Submit
      </button>
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "row",
    gap: "8px",
    marginTop: "8px",
  },
  input: {
    flex: 1,
    padding: "8px",
    fontSize: "14px",
  },
  button: {
    padding: "8px 12px",
    fontSize: "14px",
    cursor: "pointer",
  },
};


