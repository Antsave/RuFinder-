"use client";
import { useState } from "react";

//Typescript Interface
interface RegisterData {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  display_name: string;
}

export default function RegisterForm() {
  const [form, setForm] = useState<RegisterData>({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    display_name: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/users/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Registration failed");
      setMessage("User registered successfully! You can now log in.");
      setForm({
        username: "",
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        display_name: "",
      });
    } catch (err: unknown) {
        if (err instanceof Error){
            setMessage(err.message);
        }
        setMessage('An unexpected error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input name="username" placeholder="Username" value={form.username} onChange={handleChange} />
      <input name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} />
      <input name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} />
      <input name="first_name" placeholder="First Name" value={form.first_name} onChange={handleChange} />
      <input name="last_name" placeholder="Last Name" value={form.last_name} onChange={handleChange} />
      <input name="display_name" placeholder="Display Name" value={form.display_name} onChange={handleChange} />
      <button type="submit">Register</button>
      <p>{message}</p>
    </form>
  );
}
