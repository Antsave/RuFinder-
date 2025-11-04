import React from "react";
import { Link } from "react-router-dom"; // assuming you're using React Router

export default function Navbar() {
  return (
    <nav style={{
      backgroundColor: "#CC0033",
      padding: "12px 20px",
      borderRadius: "0 0 12px 12px",
      marginBottom: "20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: "#fff"
    }}>
      <div style={{ fontWeight: "bold", fontSize: "20px" }}>
        <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>RU Lost & Found</Link>
      </div>
      <div style={{ display: "flex", gap: "16px" }}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/login" style={linkStyle}>Login</Link>
        <Link to="/register" style={linkStyle}>Register</Link>
        <Link to="/profile" style={linkStyle}>Profile</Link>
      </div>
    </nav>
  );
}

const linkStyle = {
  textDecoration: "none",
  color: "#fff",
  fontWeight: "500",
  transition: "0.2s",
};

