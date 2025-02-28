import React, { useContext, useEffect, useState } from "react";
import { RestContext } from "../contexts/RestContext";
import ProductCard from "../ProductCard/ProductCard";

export default function Products() {
  const { getProduct, allProducts } = useContext(RestContext);

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {/* Search Input */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search for a product..."
          className="w-full max-w-md p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Products Grid */}
      <div className="gap-5 p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        { 
          allProducts.map((prod) => (
            <ProductCard key={prod._id} product={prod} />
          ))
   }
      </div>
    </div>
  );
}
