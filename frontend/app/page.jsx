"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Link from "next/link";

export default function Home() {
  const [recs, setRecs] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/get_recs/U001")
      .then((res) => res.json())
      .then(({ recs }) => {
        setRecs(recs);
      });

    fetch("http://localhost:5000/get_categories")
      .then((res) => res.json())
      .then(({ categories }) => {
        setCategories(categories);
      });
  }, []);

  return (
    <div className="p-12 flex flex-col gap-16 pt-[85px]">
      <div className="">
        <ReactImageGallery
          infinite={true}
          showFullscreenButton={true}
          showPlayButton={true}
          additionalClass="product-image-gallery"
          autoPlay={true}
          showThumbnails={false}
          showBullets={true}
          items={[
            {
              original: `https://picsum.photos/1000/400?r=1`,
              thumbnail: `https://picsum.photos/1000/400?r=1`,
              thumbnailClass: "w-[1000px] h-[400px] object-cover rounded-md",
              originalClass: "rounded-md",
            },
            {
              original: `https://picsum.photos/1000/400?r=2`,
              thumbnail: `https://picsum.photos/1000/400?r=2`,
              thumbnailClass: "w-[1000px] h-[400px] object-cover rounded-md",
              originalClass: "rounded-md",
            },
            {
              original: `https://picsum.photos/1000/400?r=3`,
              thumbnail: `https://picsum.photos/1000/400?r=3`,
              thumbnailClass: "w-[1000px] h-[400px] object-cover rounded-md",
              originalClass: "rounded-md",
            },
          ]}
        />
      </div>

      <div className="flex flex-col gap-6 justify-center items-center">
        <h1 className="text-2xl font-bold">Categories</h1>
        <div className="flex flex-wrap gap-4 justify-between items-center">
          {categories.map((category) => (
            <Link href={`/categories/${category}`}
              className={
                "p-2 px-4 rounded-full hover:bg-[#fff677] border-2 border-gray-500 hover:text-black cursor-pointer transition-all duration-150 " +
                `hover:bg-[${
                  ["#fff677", "#ff8b77", "#97ff77", "#77c9ff", "#d877ff"][
                    Math.floor(Math.random() * 5)
                  ]
                }]`
              }
              key={category}
            >
              <h1>
                {["📞", "🥎", "🥋", "🏓", "🎨"][Math.floor(Math.random() * 5)]}{" "}
                {category}
            </h1>
              </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6 justify-center items-center rounded-md">
        <h1 className="text-2xl font-bold">Recommendations</h1>
        <div className="flex flex-wrap gap-4 gap-y-10 justify-between items-center">
          {recs.map((product) => (
            <ProductCard
              key={product.product_id}
              product={product}
              bg2={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
