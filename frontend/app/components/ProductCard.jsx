"use client";

import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product, bg2=false }) => {
  return (
    <div key={product.product_id} className="rounded-md rounded-b-md w-[200px]">
      <Link href={"/product/" + product.product_id + "/"} className="relative">
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
      <div
        className={
          "text-center flex flex-col h-[144px] gap-2 w-full justify-between items-center p-2 px-4 rounded-b-md " +
          (bg2
            ? "bg-[#13141e]"
            : "bg-[#181a2b]")
        }
      >
        <h1>{product.title}</h1>
        <Link href={`/brand/${product.brand}`} className="subtitle underline">
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
  );
};

export default ProductCard;
