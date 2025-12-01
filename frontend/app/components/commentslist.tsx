"use client";

import {authFetch} from "@/utils/authFetch";

interface Comment {
  id: number;
  post: number;
  owner: number;
  owner_username: string;
  body: string;
  created_at: string;
}

interface CommentsListProps {
  comments: Comment[];
  currentUserId?: number; // Optional: to show delete button for own comments
  onCommentDeleted?: () => void;
}

export default function CommentsList({
  comments,
  currentUserId,
  onCommentDeleted
}: CommentsListProps) {

  const handleDelete = async (commentId: number) => {
    if (!confirm("Are you sure you want to delete this comment?")) {
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      const res = await authFetch(`http://127.0.0.1:8000/api/comments/${commentId}/`, {
        method: "DELETE",

      });

      if (!res.ok) throw new Error("Failed to delete comment");

      if (onCommentDeleted) {
        onCommentDeleted();
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("Failed to delete comment");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };

  if (comments.length === 0) {
    return (
      <p className="text-gray-500 text-sm italic">
        No comments yet. Be the first to comment!
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="bg-gray-50 rounded-md p-3 text-sm"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-gray-800">
                  {comment.owner_username}
                </span>
                <span className="text-gray-500 text-xs">
                  {formatDate(comment.created_at)}
                </span>
              </div>
              <p className="text-gray-700">{comment.body}</p>
            </div>

            {/* Show delete button only for comment owner */}
            {currentUserId && currentUserId === comment.owner && (
              <button
                onClick={() => handleDelete(comment.id)}
                className="text-red-600 hover:text-red-800 text-xs ml-2"
                title="Delete comment"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}