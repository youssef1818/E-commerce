import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import Swiper styles
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { CartContext } from "../contexts/cartContext";

export default function ProductDetails() {
  const {addToCart}= useContext(CartContext)
  const { id } = useParams();
  const [details, setDetails] = useState();

  async function getProductDetails() {
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    setDetails(data.data);
  }

  useEffect(() => {
    getProductDetails();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {details ? (
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 bg-white shadow-lg rounded-lg p-6">
          
          <div className="col-span-2">
            <Swiper loop autoplay={{ delay: 3000 }} className="rounded-lg">
              {details?.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    className="w-full h-72 object-cover rounded-lg shadow-md"
                    src={image}
                    alt="Product"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          
          <div className="col-span-4 flex flex-col justify-center space-y-4">
            <h3 className="text-4xl font-semibold text-gray-800">{details?.title}</h3>
            <p className="text-gray-600 text-lg">{details?.description}</p>

            
            <div className="flex items-center justify-between">
              <div className="flex items-center text-yellow-500 space-x-1">
                <span className="text-lg font-bold">{details?.ratingsAverage}</span>
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              </div>
              <p className="text-2xl font-bold text-green-600">{details?.price} EGP</p>
            </div>

            
            <button onClick={()=>{addToCart(id)}} className="w-full bg-green-500 hover:bg-green-600 transition duration-300 text-white font-semibold py-3 rounded-lg shadow-md">
              + Add to Cart
            </button>
          </div>
        </div>
      ) : (
          <LoadingScreen/>
      )}
    </div>
  );
}
