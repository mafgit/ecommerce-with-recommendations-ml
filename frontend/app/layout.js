import { Lexend } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

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
          <Link href="/" className="text-2xl">👜 Ecommerce Store</Link>

          <nav>
            <ul className="flex gap-4">
              <Link href="/">Home</Link>
              <Link href="/brands">Brands</Link>
              <Link href="/categories">Categories</Link>
              <Link href="/products">Products</Link>
              <Image src="https://picsum.photos/250/250" className="cursor-pointer border-green-400 border-2 rounded-full" width={30} height={30} alt="Profile" />
            </ul>
          </nav>
        </div>
        
        {children}

        <footer className="bg-[#13141e]  w-full z-50 p-4 px-12 flex justify-between items-center h-[50px]">
          <p>© 2025 Ecommerce Store with Recommendations</p>
        </footer>
      </body>
    </html>
  );
}
