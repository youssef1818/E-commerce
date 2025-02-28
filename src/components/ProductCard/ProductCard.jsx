import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/cartContext";

export default function ProductCard(props) {
  const [classColor, setClass] = useState();
  const { addToCart, addToWishlsit, checkedWish } = useContext(CartContext);
  const { title, _id, imageCover, ratingsAverage, price, description } =
    props.product;
  const rating = Math.floor(ratingsAverage);
  const redColor = "text-red-500";
  const grayColor = "text-gray-500";
  useEffect(() => {
    if (checkedWish.includes(_id)) {
      setClass(redColor);
    } else {
      setClass(grayColor);
    }
  }, [checkedWish]);
  return (
    <>
      <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-[1.03] p-4">
  <Link to={`/details/${_id}`} className="block">
    {/* Product Image */}
    <div className="relative overflow-hidden rounded-xl">
      <img
        className="rounded-xl w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
        src={imageCover}
        alt="product image"
      />
    </div>

    {/* Product Info */}
    <div className="px-4 pt-3 pb-2">
      <h5 className="text-xl font-semibold text-gray-900 truncate">{title}</h5>
      <p className="text-sm text-gray-600 truncate">{description}</p>

      {/* Rating Section */}
      <div className="flex items-center mt-2">
        <div className="flex space-x-1">
          {Array.from({ length: rating }, (_, index) => (
            <svg
              key={index}
              className="w-4 h-4 text-yellow-400 drop-shadow-sm"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          ))}
        </div>
        <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-md ml-3">
          {ratingsAverage}
        </span>
      </div>
    </div>
  </Link>

  {/* Price & Actions */}
  <div className="flex items-center justify-between px-4 pb-2">
    <span className="text-lg font-bold text-gray-900">{price} EGP</span>
    <div className="flex items-center space-x-3">
      {/* Wishlist Icon */}
      <i
        onClick={() => {
          addToWishlsit(_id);
          setClass(redColor);
        }}
        className={`fa-solid fa-heart cursor-pointer text-2xl ${classColor} transition-transform duration-300 hover:scale-110 hover:text-red-600`}
      ></i>

      {/* Add to Cart Button */}
      <button
        onClick={() => {
          addToCart(_id);
        }}
        className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 transition-all duration-300 hover:scale-105 shadow-md"
      >
        Add to Cart
      </button>
    </div>
  </div>
</div>

    </>
  );
}
