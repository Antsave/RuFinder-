// frontend/app/register/page.tsx
"use client";

import React from "react";
import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <header style={styles.header}>
          <h1 style={styles.title}>Create your account</h1>
          <p style={styles.subtitle}>
            Join RUFinder to report, recover, and reunite items.
          </p>
        </header>

        <RegisterForm />

        <footer style={styles.footer}>
          <span>Already have an account? </span>
          <a href="/login" style={styles.link}>Log in</a>
        </footer>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100dvh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "linear-gradient(180deg, rgba(245,247,250,1) 0%, rgba(236,239,244,1) 100%)",
    padding: 24,
  },
  card: {
    width: "100%",
    maxWidth: 460,
    background: "#fff",
    borderRadius: 16,
    boxShadow: "0 2px 8px rgba(0,0,0,0.06), 0 12px 24px rgba(0,0,0,0.06)",
    padding: 24,
  },
  header: { textAlign: "center", marginBottom: 16 },
  title: { margin: 0, fontSize: 24, fontWeight: 700 },
  subtitle: { margin: "8px 0 0", color: "#6b7280", fontSize: 14 },
  footer: { marginTop: 16, textAlign: "center", fontSize: 14, color: "#6b7280" },
  link: { color: "#111827", fontWeight: 600, textDecoration: "underline" },
};