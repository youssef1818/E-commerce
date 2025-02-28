import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-10">
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-3 text-green-400">Fresh Market</h3>
          <p className="text-sm text-gray-400">
            Your trusted online store for farm-fresh fruits, organic vegetables, and healthy food choices.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3 text-green-400">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="hover:text-white transition">
              <a href="#">Home</a>
            </li>
            <li className="hover:text-white transition">
              <a href="#">Shop</a>
            </li>
            <li className="hover:text-white transition">
              <a href="#">About Us</a>
            </li>
            <li className="hover:text-white transition">
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-green-400">Contact Us</h3>
          <p className="text-sm text-gray-400">
            📍 123 Green Street, Fresh City <br />
            📞 +1 234 567 890 <br />
            ✉️ support@freshmarket.com
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-green-400">We Accept</h3>
          <div className="flex gap-3 mt-2">
            <img className="w-10 grayscale hover:grayscale-0 transition" src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" />
            <img className="w-10 grayscale hover:grayscale-0 transition" src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" />
            <img className="w-10 grayscale hover:grayscale-0 transition" src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" />
          </div>

          {/* Social Media */}
          <h3 className="text-lg font-semibold mt-4 text-green-400">Follow Us</h3>
          <div className="flex gap-4 mt-2">
            <a href="#" className="hover:text-green-400 transition text-2xl">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="hover:text-green-400 transition text-2xl">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="hover:text-green-400 transition text-2xl">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-sm text-gray-500 mt-8 border-t border-gray-700 pt-4">
        &copy; 2025 Fresh Market. All Rights Reserved.
      </div>
    </footer>
  );
}
