"use client";

import { useState } from "react";

interface CommentFormProps {
  postId: number;
  onCommentAdded?: () => void;
}

export default function CommentForm({ postId, onCommentAdded }: CommentFormProps) {
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/posts/comments/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ post: postId, body }),
      });
      if (!res.ok) throw new Error("Failed to add comment");
      setMessage("Comment added!");
      setBody("");
      if (onCommentAdded) onCommentAdded(); // refresh comments
    } catch (err: unknown) {
        if (err instanceof Error){
            setMessage(err.message);
        }
        setMessage('An unexpected error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Write a comment..." value={body} onChange={e => setBody(e.target.value)} />
      <button type="submit">Comment</button>
      <p>{message}</p>
    </form>
  );
}
