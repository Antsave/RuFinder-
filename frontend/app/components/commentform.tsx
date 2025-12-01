"use client";

import { useState } from "react";
import {authFetch} from "@/utils/authFetch";

interface CommentFormProps {
  postId: number;
  onCommentAdded?: () => void;
}

export default function CommentForm({ postId, onCommentAdded }: CommentFormProps) {
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input
    if (!body.trim()) {
      setMessage("Comment cannot be empty");
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      setMessage("You must be logged in to comment");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const res = await authFetch(`http://127.0.0.1:8000/api/comments/`, {
        method: "POST",

        body: JSON.stringify({ post: postId, body: body.trim() }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.detail || "Failed to add comment");
      }

      // Success!
      setMessage("Comment added successfully!");
      setBody("");

      // Call parent callback to refresh comments
      if (onCommentAdded) {
        onCommentAdded();
      }

      // Clear success message after 3 seconds
      setTimeout(() => setMessage(""), 3000);

    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage(err.message);
      } else {
        setMessage("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Write a comment..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="flex-1 border-2 border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          disabled={isLoading}
          maxLength={500}
        />
        <button
          type="submit"
          disabled={isLoading || !body.trim()}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
        >
          {isLoading ? "Posting..." : "Comment"}
        </button>
      </div>

      {message && (
        <p
          className={`mt-2 text-sm ${
            message.includes("success") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}