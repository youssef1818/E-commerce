import axios, { all } from "axios";
import React, { useContext, useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { useQuery } from "react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import Slider1 from "../../../images/Slider1.jpg";
import Slider2 from "../../../images/Slider2.jpg";
import Slider3 from "../../../images/Slider3.jpg";
import img2 from "../../../images/img2.jpg";
import img3 from "../../../images/img3.jpg";
import { CartContext } from "../contexts/cartContext";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

export default function Home() {
  const { getWishlist } = useContext(CartContext);

  async function getProduct() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  function getAllCat() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { data, isLoading } = useQuery({
    queryKey: "allProducts",
    queryFn: getProduct,
    refetchOnWindowFocus: "false",
  });
  const allProdcutsData = data?.data.data;
  // console.log(allProdcutsData, 'dataa')

  const { data: allCat, isLoading: catLoading } = useQuery({
    queryKey: "allCategories",
    queryFn: getAllCat,
    refetchOnWindowFocus: "false",
  });
  const cat = allCat?.data.data;

  // console.log(cat)

  return (
    <>
      <div className="m-5 md:flex justify-center items-center gap-4">
        <div className="bg-white border border-gray-300 rounded-xl shadow-lg p-3">
          <Swiper
            className="m-4 w-96 md:w-64 rounded-lg overflow-hidden"
            grabCursor={true}
            loop={true}
          >
            <SwiperSlide>
              <img
                className="w-full rounded-lg hover:scale-105 transition-transform"
                src={Slider1}
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-full rounded-lg hover:scale-105 transition-transform"
                src={Slider2}
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-full rounded-lg hover:scale-105 transition-transform"
                src={Slider3}
                alt=""
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="flex flex-col justify-center items-center md:w-64 gap-3">
          <img
            className="w-full rounded-lg shadow-md border border-gray-300 hover:shadow-xl transition-shadow"
            src={img2}
            alt=""
          />
          <img
            className="w-full rounded-lg shadow-md border border-gray-300 hover:shadow-xl transition-shadow"
            src={img3}
            alt=""
          />
        </div>
      </div>

      <Swiper
        className="m-10"
        loop={true}
        slidesPerView={6}
        spaceBetween={20}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        modules={[Navigation, Pagination, Autoplay]}
      >
        {catLoading ? (
          <LoadingScreen />
        ) : (
          cat.map((category) => (
            <SwiperSlide key={category._id}>
              <div className="border border-gray-300 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 bg-white overflow-hidden">
                <img
                  className="h-[200px] w-full object-cover rounded-t-xl"
                  src={category.image}
                  alt={category.name}
                />
                <div className="p-4 text-center font-semibold text-gray-800 bg-gray-100 border-t">
                  {category.name}
                </div>
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>

      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="gap-5 p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {allProdcutsData.map((prod) => {
            return <ProductCard key={prod._id} product={prod} />;
          })}
        </div>
      )}
    </>
  );
}
