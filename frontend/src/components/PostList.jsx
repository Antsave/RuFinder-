import React from "react";

export default function PostList({ posts }) {
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="post-card">
          <h3>{post.type} - {post.location}</h3>
          <p>{post.description}</p>
          {post.image && <img src={post.image} alt="item" />}
          {post.comments.length > 0 && (
            <div className="comments">
              {post.comments.map((c, i) => (
                <div key={i} className="comment">{c}</div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
