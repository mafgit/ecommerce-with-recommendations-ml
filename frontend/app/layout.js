import { Lexend } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import Navbar from "./components/Navbar";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const metadata = {
  title: "Ecommerce Store",
  description: "Store with recommendation system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${lexend.className} font-sans antialiased`}>
        <Navbar />

        {children}

        <footer className="bg-[#13141e]  w-full z-50 p-4 px-12 flex justify-between items-center h-[50px]">
          <p>© 2025 Ecommerce Store with Recommendations</p>
          <p>
            Created by{" "}
            <Link href="https://github.com/mafgit" className="underline" target="_blank">
              mafgit
            </Link>
          </p>
        </footer>
      </body>
    </html>
  );
}
