import React, { useState } from "react";

export default function CommentForm({ onCommentSubmit }) {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    onCommentSubmit(comment);
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        placeholder="Add
