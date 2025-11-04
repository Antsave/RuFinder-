import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";

export default function Home() {
  const [posts, setPosts] = useState([]);

  // Fetch posts from Django backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/posts/");
        const data = await res.json();
        setPosts(data.reverse()); // newest first
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // Handle new post submission
  const handleNewPost = async (newPost) => {
    try {
      const formData = new FormData();
      formData.append("title", newPost.title);
      formData.append("description", newPost.description);
      formData.append("status", newPost.status);
      formData.append("location", newPost.location);
      if (newPost.image) formData.append("image", newPost.image);

      const res = await fetch("http://localhost:8000/api/posts/", {
        method: "POST",
        body: formData,
      });

      const savedPost = await res.json();
      setPosts([savedPost, ...posts]); // Add new post at top
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: 800, margin: "30px auto", padding: 16 }}>
        <h2 style={{ color: "#CC0033", textAlign: "center" }}>
          Report Lost / Found Item
        </h2>
        <PostForm onPostSubmit={handleNewPost} />
        <h2 style={{ color: "#CC0033", marginTop: 32 }}>All Posts</h2>
        <PostList posts={posts} />
      </div>
    </div>
  );
}
