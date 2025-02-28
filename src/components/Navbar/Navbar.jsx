import React, { useContext, useEffect, useState } from "react";
import Logo from "../../../images/freshcart-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { CartContext } from "../contexts/cartContext";

export default function Navbar() {
  const { token, setToken } = useContext(AuthContext);
  const { numCart, getWishlist, getCartItem } = useContext(CartContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  }

  useEffect(() => {
    getWishlist();
    getCartItem();
  }, []);

  return (
    <nav className="bg-white shadow-md sticky top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <img src={Logo} alt="FreshCart" className="w-32" />
        </Link>

        {/* Desktop Menu */}
        {token && (
          <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
            <li>
              <Link to="/" className="hover:text-green-600 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-green-600 transition">
                Cart
              </Link>
            </li>
            <li>
              <Link to="/wishlist" className="hover:text-green-600 transition">
                Wishlist
              </Link>
            </li>
            <li>
              <Link
                to="/categories"
                className="hover:text-green-600 transition"
              >
                Categories
              </Link>
            </li>
            <li>
              <Link to="/brands" className="hover:text-green-600 transition">
                Brands
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-green-600 transition">
                Products
              </Link>
            </li>
          </ul>
        )}

        
        <div className="flex items-center space-x-4">
          {token ? (
            <>
              {/* Cart Icon */}
              <Link to="/cart" className="relative">
                <i className="fa-solid fa-cart-shopping text-2xl text-gray-700 hover:text-green-600 transition"></i>
                {numCart > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {numCart}
                  </span>
                )}
              </Link>

              {/* Logout Button */}
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition"
              >
                Log out
              </button>
            </>
          ) : (
            <div className="flex space-x-2">
              <Link
                to="/login"
                className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="border border-green-500 text-green-600 px-4 py-2 rounded-lg shadow-md hover:bg-green-500 hover:text-white transition"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          {token && (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 text-2xl"
            >
              <i
                className={`fa-solid ${isMenuOpen ? "fa-xmark" : "fa-bars"}`}
              ></i>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && token && (
        <div className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col space-y-2 p-4 text-gray-700 font-medium">
            <li>
              <Link to="/" className="hover:text-green-600 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-green-600 transition">
                Cart
              </Link>
            </li>
            <li>
              <Link to="/wishlist" className="hover:text-green-600 transition">
                Wishlist
              </Link>
            </li>
            <li>
              <Link
                to="/categories"
                className="hover:text-green-600 transition"
              >
                Categories
              </Link>
            </li>
            <li>
              <Link to="/brands" className="hover:text-green-600 transition">
                Brands
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-green-600 transition">
                Products
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
