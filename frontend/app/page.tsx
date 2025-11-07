"use client";

import { useEffect, useState } from "react";

// TypeScript interfaces
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
  const postsPerPage = 5; // ✅ change this value to show more or fewer per page

  useEffect(() => {
    const fetchPosts = fetch(`http://127.0.0.1:8000/api/posts/`).then(res => res.json());
    const fetchComments = fetch(`http://127.0.0.1:8000/api/comments/`).then(res => res.json());

    Promise.all([fetchPosts, fetchComments])
      .then(([postsData, commentsData]: [Post[], Comment[]]) => {
        // Sort posts so newest appear first
        const sortedPosts = postsData.sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setPosts(sortedPosts);
        setComments(commentsData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching API:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  //  Pagination logic
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
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center text-red-600">Posts</h1>

      {posts.length === 0 && <p className="text-center text-gray-500">No posts found.</p>}

      <ul className="space-y-6">
        {currentPosts.map(post => (
          <li key={post.id} className="border p-4 rounded shadow bg-white">
            <h2 className="text-xl font-semibold mb-2 text-red-600">{post.title}</h2>
            <p className="mb-2 text-red-600">{post.description}</p>
            <p className="text-sm text-gray-500 mb-1">
              Category: {post.category === "L" ? "Lost" : "Found"} | Location: {post.location}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              Posted by: {post.owner_username} •{" "}
              {new Date(post.created_at).toLocaleString()}
            </p>

            {post.image && (
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}${post.image}`}
                alt={post.title}
                className="mt-2 max-w-xs rounded"
              />
            )}

            {/* Comments Section */}
            <div className="mt-4 border-t pt-2">
              <h3 className="font-semibold text-sm mb-2 text-red-600">Comments:</h3>
              {comments.filter(c => c.post === post.id).length > 0 ? (
                comments
                  .filter(c => c.post === post.id)
                  .map(c => (
                    <div key={c.id} className="text-sm mb-1">
                      <span className="font-medium">{c.owner_username}:</span> {c.body}
                    </div>
                  ))
              ) : (
                <p className="text-gray-500 text-sm">No comments yet.</p>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination controls */}
      <div className="flex justify-center items-center mt-8 space-x-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
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
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
