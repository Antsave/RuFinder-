import React, { useState } from "react";
import Navbar from "../components/Navbar"; // make sure this exists

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", email, password);
  };

  return (
    <div>
      <Navbar /> {/* Navigation bar added here */}
      <div style={styles.container}>
        <div style={styles.formBox}>
          <h1 style={styles.mainHeading}>Login</h1>
          <h2 style={styles.subHeading}>Who R U?</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />

            <button type="submit" style={styles.button}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "80vh", // reduce a bit to leave space for navbar
    backgroundColor: "#f2f2f2",
    paddingTop: "20px",
  },
  formBox: {
    backgroundColor: "#fff",
    padding: "40px 30px",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
  },
  mainHeading: {
    textAlign: "center",
    color: "#333",
    marginBottom: "5px",
    fontSize: "28px",
  },
  subHeading: {
    textAlign: "center",
    color: "#CC0033",
    marginBottom: "25px",
    fontSize: "20px",
    fontWeight: "normal",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    padding: "12px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#CC0033",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
    transition: "0.2s",
  },
};
