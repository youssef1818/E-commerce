import React, { useContext, useEffect } from "react";
import { CartContext } from "../contexts/cartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const {
    getCartItem,
    allCartItems,
    updateCartItem,
    TotalPrice,
    deleteProduct,
  } = useContext(CartContext);

  useEffect(() => {
    getCartItem();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {allCartItems.length === 0 ? (
        <div className="bg-gray-100 h-60 flex flex-col justify-center items-center text-2xl text-gray-500 rounded-lg shadow-lg">
          <h2 className="animate-pulse">Your Cart is Empty 🛒</h2>
        </div>
      ) : (
        <>
          {/* Total Price & Checkout */}
          <div className="flex flex-col md:flex-row justify-between items-center bg-white shadow-lg rounded-xl p-5 mb-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">
              Total: <span className="text-green-600">{TotalPrice} EGP</span>
            </h2>
            <Link to='/order'>
            <button  className="flex items-center gap-2 bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition-all duration-300 transform hover:scale-105">
              <i className="fas fa-credit-card"></i> Proceed to Checkout
            </button>
            </Link>
          </div>

          {/* Cart Table */}
          <div className="relative overflow-x-auto bg-white shadow-lg rounded-xl p-5 border border-gray-200">
            <table className="w-full text-sm text-gray-800">
              <thead className="text-xs uppercase bg-gray-50 text-gray-600 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-3">Product</th>
                  <th className="px-6 py-3">Quantity</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {allCartItems.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b hover:bg-gray-50 transition duration-200"
                  >
                    {/* Product Details */}
                    <td className="px-6 py-4 flex items-center space-x-4">
                      <img
                        src={item.product.imageCover}
                        className="w-16 h-16 object-cover rounded-lg shadow-md border border-gray-300"
                        alt={item.product.title}
                      />
                      <span className="font-semibold text-gray-900">
                        {item.product.title}
                      </span>
                    </td>

                    {/* Quantity Control */}
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <button
                          disabled={item.count === 1}
                          onClick={() =>
                            updateCartItem(item.product.id, item.count - 1)
                          }
                          className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full w-9 h-9 flex items-center justify-center shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <i className="fas fa-minus"></i>
                        </button>
                        <span className="text-lg font-bold">{item.count}</span>
                        <button
                          onClick={() =>
                            updateCartItem(item.product.id, item.count + 1)
                          }
                          className="bg-green-500 hover:bg-green-600 text-white rounded-full w-9 h-9 flex items-center justify-center shadow-md transition-all duration-300"
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4 font-bold text-gray-900">
                      {item.price} EGP
                    </td>

                    {/* Remove Button */}
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => deleteProduct(item.product.id)}
                        className="text-red-500 cursor-pointer hover:text-red-700 font-semibold transition-all duration-300 flex items-center justify-center gap-1"
                      >
                        <i className="fas fa-trash-alt"></i> Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
