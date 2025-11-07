// app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';
// Import the new Header component
import Header from './components/Header'; // Adjust path if needed

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        {/* Use the imported Header component */}
        <Header />
        <main className="container mx-auto p-6">{children}</main>
        <footer className="p-4 text-center bg-red-600 text-white">
          © 2025 RU Finder. All rights reserved.
        </footer>
      </body>
    </html>
  );
}

// -----------------------------
// Remove the old Header component
// function from this file.
// -----------------------------