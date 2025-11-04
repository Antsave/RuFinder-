// src/components/RegisterForm.jsx
import React, { useState } from 'react';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (res.ok) {
        setMessage('Registration successful! You can now log in.');
        // Clear form
        setUsername('');
        setEmail('');
        setPassword('');
      } else {
        const data = await res.json();
        // Show error messages returned by backend
        setMessage(JSON.stringify(data));
      }
    } catch (err) {
      console.error(err);
      setMessage('Error connecting to the server.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center text-red-600">Register</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
        required
      />
      <button
        type="submit"
        className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-colors"
      >
        Register
      </button>

      {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
    </form>
  );
};

export default RegisterForm;
