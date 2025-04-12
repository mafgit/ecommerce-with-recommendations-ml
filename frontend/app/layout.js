import { Lexend } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"]
});

export const metadata = {
  title: "Ecommerce Store",
  description: "Store with recommendation system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${lexend.className} font-sans antialiased`}
      >
        <div className="bg-[#181a2b] fixed top-0 left-0 right-0 w-full z-50 p-4 px-12 flex justify-between items-center">
          <h1 className="text-2xl">👜 Ecommerce Store</h1>

          <nav>
            <ul className="flex gap-4">
              <Link href="/">Home</Link>
              <Link href="/brands">Brands</Link>
              <Link href="/categories">Categories</Link>
            </ul>
          </nav>
        </div>
        
        {children}
      </body>
    </html>
  );
}
