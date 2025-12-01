"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "../../hooks/useAuth"; // adjust path as needed

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
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Optional: Auto-login after successful registration
  const autoLoginAfterRegister = async (username: string, password: string) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/users/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data = await res.json();
        login(data.access, data.refresh);

        setMessage("Registration successful! Logging you in...");
        setTimeout(() => {
          router.push("/profile");
        }, 1000);
      } else {
        setMessage("Registration successful! Please log in.");
      }
    } catch (err) {
      setMessage("Registration successful! Please log in.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/users/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.detail || "Registration failed");
      }

      // Store credentials for auto-login
      const username = form.username;
      const password = form.password;

      // Clear form
      setForm({
        username: "",
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        display_name: "",
      });

      // Auto-login after successful registration
      await autoLoginAfterRegister(username, password);

    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage(err.message);
      } else {
        setMessage('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <h2 className="text-2xl font-semibold text-black mb-4 text-center">
        Register
      </h2>

      {[
        { name: "username", type: "text", placeholder: "Username" },
        { name: "email", type: "email", placeholder: "Email" },
        { name: "password", type: "password", placeholder: "Password" },
        { name: "first_name", type: "text", placeholder: "First Name" },
        { name: "last_name", type: "text", placeholder: "Last Name" },
        { name: "display_name", type: "text", placeholder: "Display Name" },
      ].map(({ name, type, placeholder }) => (
        <div key={name}>
          <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {placeholder}:
          </label>
          <input
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            value={(form as any)[name]}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 rounded-md p-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
            disabled={isLoading}
          />
        </div>
      ))}

      <button
        type="submit"
        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-md transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        {isLoading ? "Registering..." : "Register"}
      </button>

      {message && (
        <p
          className={`mt-2 text-center text-sm ${
            message.includes("success")
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}