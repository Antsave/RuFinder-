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

  useEffect(() => {
    const fetchPosts = fetch(`http://127.0.0.1:8000/api/posts/`).then(res => res.json());
    const fetchComments = fetch(`http://127.0.0.1:8000/api/comments/`).then(res => res.json());

    Promise.all([fetchPosts, fetchComments])
      .then(([postsData, commentsData]: [Post[], Comment[]]) => {
        setPosts(postsData);
        setComments(commentsData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching API:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Posts</h1>
      {posts.length === 0 && <p>No posts found.</p>}
      <ul className="space-y-6">
        {posts.map(post => (
          <li key={post.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p>{post.description}</p>
            <p className="text-sm text-gray-500">
              Category: {post.category === "L" ? "Lost" : "Found"} | Location: {post.location}
            </p>
            <p className="text-sm text-gray-500">Posted by: {post.owner_username}</p>
            {post.image && (
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}${post.image}`}
                alt={post.title}
                className="mt-2 max-w-xs"
              />
            )}

            {/* Comments */}
            <div className="mt-4 border-t pt-2">
              <h3 className="font-semibold text-sm mb-2">Comments:</h3>
              {comments.filter(c => c.post === post.id).map(c => (
                <div key={c.id} className="text-sm mb-1">
                  <span className="font-medium">{c.owner_username}:</span> {c.body}
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
