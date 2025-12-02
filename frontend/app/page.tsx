// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authFetch } from "@/utils/authFetch";
import CommentForm from "./components/commentform";
import CommentsList from "./components/commentslist";

interface Post {
  id: number;
  title: string;
  description: string;
  category: "L" | "F";
  location: string;
  image: string | null;
  owner: number;
  owner_username: string;
  created_at: string;
}

interface Comment {
  id: number;
  post: number;
  owner: number;
  owner_username: string;
  body: string;
  created_at: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const router = useRouter();
  const postsPerPage = 5;

  // Fetch current user
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      try {
        const res = await authFetch("http://127.0.0.1:8000/api/users/me/");
        if (res.ok) {
          const userData = await res.json();
          setCurrentUserId(userData.id);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  // Fetch posts and comments
  const fetchData = async () => {
    try {
      const [postsData, commentsData] = await Promise.all([
        fetch(`http://127.0.0.1:8000/api/posts/`).then(res => res.json()),
        fetch(`http://127.0.0.1:8000/api/comments/`).then(res => res.json()),
      ]);

      const sortedPosts = postsData.sort(
        (a: Post, b: Post) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      
      setPosts(sortedPosts);
      setComments(commentsData);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Refresh comments
  const refreshComments = async () => {
    try {
      const commentsData = await fetch(`http://127.0.0.1:8000/api/comments/`).then(res => res.json());
      setComments(commentsData);
    } catch (err) {
      console.error("Error refreshing comments:", err);
    }
  };

  // 🆕 DELETE POST FUNCTION
  const handleDeletePost = async (postId: number, postTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${postTitle}"?\n\nThis will also delete all comments on this post.`)) {
      return;
    }

    try {
      const res = await authFetch(`http://127.0.0.1:8000/api/posts/${postId}/`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        console.error('Delete failed:', {
          status: res.status,
          errorData: errorData
        });
        
        if (res.status === 403) {
          throw new Error("You don't have permission to delete this post");
        } else if (res.status === 404) {
          throw new Error("Post not found");
        } else if (res.status === 401) {
          throw new Error("You must be logged in to delete posts");
        } else {
          throw new Error(errorData?.detail || `Failed to delete post (${res.status})`);
        }
      }

      // Success! Refresh the posts list
      await fetchData();
      
      // If we deleted a post on the current page and it was the last one,
      // go back a page
      if (posts.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }

    } catch (error) {
      console.error("Error deleting post:", error);
      alert(error instanceof Error ? error.message : "Failed to delete post");
    }
  };

  if (loading) return <p className="text-center mt-8">Loading...</p>;

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center text-red-600">Posts</h1>

      {posts.length === 0 && <p className="text-center text-gray-500">No posts found.</p>}

      <ul className="space-y-6">
        {currentPosts.map(post => {
          const postComments = comments.filter(c => c.post === post.id);
          const isOwner = currentUserId && currentUserId === post.owner;

          return (
            <li key={post.id} className="border p-4 rounded shadow bg-white">
              {/* Post Header with Delete Button */}
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-semibold text-red-600 flex-1">{post.title}</h2>
                
                {/* 🆕 DELETE BUTTON - Only show for post owner */}
                {isOwner && (
                  <button
                    onClick={() => handleDeletePost(post.id, post.title)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium ml-2 px-3 py-1 border border-red-600 rounded hover:bg-red-50 transition-colors"
                    title="Delete post"
                  >
                    Delete Post
                  </button>
                )}
              </div>

              <p className="mb-2 text-gray-800">{post.description}</p>
              <p className="text-sm text-gray-500 mb-1">
                Category: {post.category === "L" ? "Lost" : "Found"} | Location: {post.location}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                Posted by: {post.owner_username} •{" "}
                {new Date(post.created_at).toLocaleString()}
              </p>

              {/* Image */}
              {post.image && (
                <div className="mt-3 mb-3">
                  <img
                    src={post.image.startsWith('http') ? post.image : `http://127.0.0.1:8000${post.image}`}
                    alt={post.title}
                    className="max-w-full h-auto rounded shadow-sm"
                    style={{ maxHeight: '400px', objectFit: 'contain' }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}

              {/* Comments Section */}
              <div className="mt-4 border-t pt-3">
                <h3 className="font-semibold text-sm mb-3 text-red-600">
                  Comments ({postComments.length})
                </h3>

                <CommentsList 
                  comments={postComments}
                  currentUserId={currentUserId ?? undefined}
                  onCommentDeleted={refreshComments}
                />

                <CommentForm 
                  postId={post.id} 
                  onCommentAdded={refreshComments}
                />
              </div>
            </li>
          );
        })}
      </ul>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${
              currentPage === 1
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-red-600 text-white hover:bg-red-700"
            }`}
          >
            Previous
          </button>

          <span className="text-gray-700 font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-red-600 text-white hover:bg-red-700"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}