// app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <header className="p-4 bg-blue-600 text-white font-bold">
          RUFinder
        </header>

        <main className="container mx-auto p-6">{children}</main>

        <footer className="p-4 text-center text-gray-500">
          © 2025 RUFinder
        </footer>
      </body>
    </html>
  );
}
