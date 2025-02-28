import React, { useContext, useEffect } from 'react'
import { CartContext } from '../contexts/cartContext'

export default function WishList() {
    const { getWishlist, WishItems, addToCart, deleteWish } = useContext(CartContext);
    useEffect(() => {
        getWishlist()
    }, [])
    return <>
    {WishItems?.length === 0 ? (
      <div className="bg-gray-200 h-60 flex justify-center items-center text-2xl text-gray-500 rounded-lg shadow-md">
        <h2 className="animate-pulse">Wishlist Is Empty ❤️</h2>
      </div>
    ) : (
      <div className="container mx-auto px-4 py-6">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {WishItems?.map((item) => (
            <div
              key={item.id}
              className="relative group bg-white border border-gray-200 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              {/* Product Image */}
              <img
                className="p-6 rounded-t-lg w-full h-52 object-cover transition-all duration-300 group-hover:scale-105"
                src={item.imageCover}
                alt="product image"
              />
  
              {/* Product Details */}
              <div className="px-5 pb-5">
                <h5 className="text-xl font-semibold text-gray-900 truncate">
                  {item.title}
                </h5>
                <span className="text-2xl font-bold text-green-600 py-1">
                  ${item.price}
                </span>
  
                {/* Buttons Section */}
                <div className="mt-3 space-y-2">
                  <button
                    onClick={() => addToCart(item.id)}
                    className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg text-sm px-4 py-2.5 shadow-md transition-all duration-300 transform hover:scale-105"
                  >
                    <i className="fas fa-shopping-cart"></i> Add to Cart
                  </button>
  
                  <button
                    onClick={() => deleteWish(item.id)}
                    className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg text-sm px-4 py-2.5 shadow-md transition-all duration-300 transform hover:scale-105"
                  >
                    <i className="fas fa-trash"></i> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </>
  
}
