import React, { useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { CartContext } from "../contexts/cartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AllOrders() {
  const { userId } = useContext(CartContext);
  const [allOrders, setAllOrders] = useState([]);
  const navigate = useNavigate();
  async function getAllOrders(userId) {
    try {
      const res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
      );
      setAllOrders(res.data);
      console.log(res, "afafafa");
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }

  useEffect(() => {
    if (userId) {
      getAllOrders(userId);
    }
  }, [userId]);

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Your Orders</h2>
      {allOrders.length > 0 ? (
        allOrders.map((order, orderIndex) => (
          <div
            key={order._id}
            className="mb-8 p-4 border border-gray-400 rounded-lg shadow-md"
          >
            <h3 className="text-lg font-semibold mb-2">
              Order ID: {order._id}
            </h3>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2">Product</th>
                  <th className="border border-gray-300 p-2">Quantity</th>
                  <th className="border border-gray-300 p-2">Price</th>
                  <th className="border border-gray-300 p-2">Total Price</th>
                </tr>
              </thead>
              <tbody>
                {order.cartItems.map((prod, index) => (
                  <tr key={`${order._id}-${index}`} className="border-b">
                    <td className="border border-gray-300 p-2 flex items-center gap-2">
                      <img
                        src={prod.product.imageCover}
                        alt={prod.product.title}
                        className="w-12 h-12 object-cover"
                      />
                      {prod.product.title}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {prod.count}
                    </td>
                    <td className="border border-gray-300 p-2">
                      ${prod.price}
                    </td>
                    <td className="border border-gray-300 p-2">
                      ${prod.count * prod.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <p className="text-center p-4">No orders found</p>
      )}
      <button
        onClick={() => navigate("/")}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-2xl shadow-md transition duration-300 ease-in-out transform hover:scale-105"
      >
        Done
      </button>
    </div>
  );
}
