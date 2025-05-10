"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [brandsOpen, setBrandsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const router = useRouter();
  const [query, setQuery] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:5000/get_categories")
      .then((res) => res.json())
      .then(({ categories }) => {
        setCategories(categories);
      });

    fetch("http://localhost:5000/get_brands")
      .then((res) => res.json())
      .then(({ brands }) => {
        setBrands(brands);
      });
  }, []);

  if (typeof window !== "undefined")
    window.document.body.onclick = (e) => {
      if (
        (categoriesOpen || brandsOpen) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
        && e.target.id !== "nav-brands-opener"
        && e.target.id !== "nav-categories-opener"
      ) {
        setCategoriesOpen(false);
        setBrandsOpen(false);
      }
    };

  return (
    <div className="w-full flex flex-col fixed top-0 left-0 right-0 z-50">
      <div className="bg-[#181a2b]  p-4 px-12 flex justify-between items-center">
        <Link href="/" className="text-2xl">
          👜 Ecommerce Store
        </Link>

        <nav>
          <ul className="flex gap-4 items-center justify-center">
            <Link href="/">Home</Link>
            <h1
              id="nav-brands-opener"
              className="cursor-pointer flex justify-center items-center"
              onClick={() => {
                setBrandsOpen(!brandsOpen);
                setCategoriesOpen(false);
              }}
            >
              Brands{" "}
              <span
                className={
                  "text-[10px] ml-1 mt-[2px] text-gray-400" +
                  (brandsOpen ? " rotate-180" : "")
                }
              >
                ▼
              </span>
            </h1>
            <h1
              className="cursor-pointer flex justify-center items-center"
              id="nav-categories-opener"
              onClick={() => {
                setCategoriesOpen(!categoriesOpen);
                setBrandsOpen(false);
              }}
            >
              Categories{" "}
              <span
                className={
                  "text-[10px] ml-1 mt-[2px] text-gray-400" +
                  (categoriesOpen ? " rotate-180" : "")
                }
              >
                ▼
              </span>
            </h1>
            <div className="flex">
              <input
                type="text"
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products"
                className="outline-none border-none text-gray-800 w-[200px] h-[35px] bg-white rounded-full rounded-r-none px-3 py-1"
              />
              <button
                onClick={() => {
                  if (query.trim()) router.push("/search?q=" + query);
                }}
                className="bg-white outline-none border-none w-[35px] h-[35px] flex justify-center items-center rounded-full rounded-l-none p-2"
              >
                🔍
              </button>
            </div>
            <Image
              src="https://picsum.photos/250/250"
              className="cursor-pointer border-green-400 border-2 rounded-full"
              width={30}
              height={30}
              alt="Profile"
            />
          </ul>
        </nav>
      </div>

      <div ref={dropdownRef} className={"nav-dropdown relative border-b-1 border-b-black py-7 bg-[#181a2b] w-full grid-cols-3 grid px-12 gap-y-3 text-center opacity-95" + (categoriesOpen || brandsOpen ? " opened" : "")}>
        {categoriesOpen ? (
          categories.map((category) => (
            <Link
              className="hover:underline underline-offset-2 nav-category flex items-center justify-center gap-1"
              href={`/category/${category}`}
              key={category}
            >
              {["📞", "🥎", "🥋", "🏓", "🎨"][Math.floor(Math.random() * 5)]}{" "}
              {category} <span className="text-[10px]">➤</span>
            </Link>
          ))
        ) : (
          <></>
        )}

        {brandsOpen ? (
          brands.map((brand) => (
            <Link
              className="hover:underline underline-offset-2 nav-brand flex items-center justify-center gap-1"
              href={`/brand/${brand}`}
              key={brand}
            >
              {brand} <span className="text-[10px]">➤</span>
            </Link>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Navbar;
