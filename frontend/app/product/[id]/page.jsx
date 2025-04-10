"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const page = ({ params }) => {
  const [product, setProduct] = useState({});
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    params.then(({ id }) => {
      fetch("http://localhost:5000/get_product/" + id)
        .then((res) => {
          return res.json();
        })
        .then(({ product, similar }) => {
          setProduct(product);
          setSimilar(similar);
        });
    });
  }, []);

  return (
    <div className="p-12 flex flex-col gap-16 pt-[100px]">
      <div className="flex gap-8">
        <div className="">
          <ReactImageGallery
            infinite={false}
            showFullscreenButton={true}
            showPlayButton={true}
            additionalClass="product-image-gallery"
            items={[
              {
                original: `https://picsum.photos/200/300?r=1`,
                thumbnail: `https://picsum.photos/200/300?r=1`,
                thumbnailClass: "w-[50px] h-[50px] object-cover rounded-md",
                originalClass: "rounded-md",
              },
              {
                original: `https://picsum.photos/200/300?r=2`,
                thumbnail: `https://picsum.photos/200/300?r=2`,
                thumbnailClass: "w-[50px] h-[50px] object-cover rounded-md",
                originalClass: "rounded-md",
              },
              {
                original: `https://picsum.photos/200/300?r=3`,
                thumbnail: `https://picsum.photos/200/300?r=3`,
                thumbnailClass: "w-[50px] h-[50px] object-cover rounded-md",
                originalClass: "rounded-md",
              },
            ]}
          />

          <div className="">
            <span className="bg-white "></span>
          </div>
        </div>
        <div className="flex flex-col gap-4 text-lg">
          <h1 className="text-4xl font-bold">{product.title}</h1>
          <Link href={`/brand/${product.brand}`} className="subtitle underline">
            {product.brand}
          </Link>
          <Link
            href={`/category/${product.category}`}
            className="subtitle underline bg-[#26283b] w-max rounded-full px-2 py-1 "
          >
            {product.category}
          </Link>
          <p className="italic">{product.description}</p>
          <p className="subtitle bg-[#26283b] w-max rounded-full px-2 py-1 ">
            🎨 Color: {product.color}
          </p>
          <p className="subtitle bg-[#26283b] w-max rounded-full px-2 py-1 ">
            📐 Size: {product.size}
          </p>
          <p className="subtitle bg-[#26283b] w-max rounded-full px-2 py-1 ">
            🧱 Material: {product.material}
          </p>

          <h1 className="mt-2 text-3xl font-bold text-green-600 flex justify-center items-center w-max">
            🏷️ PKR {product.final_price}{" "}
            {product.discount > 0 ? (
              <>
                <span className="ml-2 text-red-600 line-through opacity-80 text-xl">
                  PKR {product.price}
                </span>
                <span className="ml-2 text-xl">({product.discount}% off)</span>
              </>
            ) : (
              <></>
            )}
          </h1>

          <button className="p-2 px-4 bg-green-700 rounded-md h-max w-max">
            🛒 Add to Cart{" "}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6 justify-center items-center bg-[#13141e] rounded-md p-4 py-8">
        <h1 className="text-2xl font-bold">Similar Products</h1>
        <div className="flex flex-wrap gap-4 justify-between items-center">
          {similar.map((product) => (
            <div
              key={product.product_id}
              className="rounded-md rounded-b-md w-[200px]"
            >
              <Link
                href={"/product/" + product.product_id + "/"}
                className="relative"
              >
                <Image
                  className="rounded-t-md hover:opacity-75 transition-all duration-150"
                  src={`https://picsum.photos/200/250?r=${Math.random()}`}
                  width={200}
                  height={200}
                  alt="Product Image"
                />

                {product.discount > 0 ? (
                  <span className="absolute top-[5px] left-[5px] bg-green-700 rounded-full px-2 py-1 text-sm">
                    🚨 {product.discount}%
                  </span>
                ) : (
                  <></>
                )}
                <span className="absolute top-[5px] right-[5px] bg-[#181a2b9a] rounded-full px-2 py-1 text-sm">
                  {product.category}
                </span>
              </Link>
              <div className="bg-[#181a2b] text-center flex flex-col h-[144px] gap-2 w-full justify-between items-center p-2 px-4 rounded-b-md">
                <h1>{product.title}</h1>
                <Link
                  href={`/brand/${product.brand}`}
                  className="subtitle underline"
                >
                  {product.brand}
                </Link>
                <h1 className="p-2 rounded-md text-sm bg-green-700 h-max w-full">
                  🏷️ PKR {product.final_price}{" "}
                  {product.discount > 0 ? (
                    <span className="line-through opacity-80 text-xs">
                      {product.price}
                    </span>
                  ) : (
                    <></>
                  )}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
