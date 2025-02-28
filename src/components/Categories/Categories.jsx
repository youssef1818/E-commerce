import React, { useContext, useEffect } from "react";
import { RestContext } from "../contexts/RestContext";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

export default function Categories() {
  const { getCategories, allCat ,getSpecCat,getSubCat,getSpecSubCat,getAllSubCat,allSubCat } = useContext(RestContext);
  
  useEffect(() => {
    getCategories();
    getSubCat();
  }, []);

  return <div className="container mx-auto px-4 py-10">
  <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
    Explore Categories
  </h2>

  {allCat ? (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {allCat.map((item) => (
        <div
          key={item.id}
          className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1"
        >
          <img
            onClick={() => {
              getSpecCat(item._id);
              getAllSubCat(item._id);
            }}
            className="object-cover w-full h-56 md:h-48 rounded-t-lg cursor-pointer"
            src={item.image}
            alt={item.name}
          />
          <div className="p-4 text-center">
            <h5
              onClick={() => {
                getSpecCat(item._id);
                getAllSubCat(item._id);
              }}
              className="text-xl font-semibold text-gray-900 cursor-pointer hover:text-blue-500"
            >
              {item.name}
            </h5>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <LoadingScreen />
  )}

  {/* Subcategories Section */}
  {allSubCat?.length > 0 && (
    <>
      <h3 className="text-2xl font-bold text-gray-800 text-center mt-12 mb-6">
        Subcategories
      </h3>
      <div className="flex flex-wrap justify-center gap-4">
        {allSubCat.map((item) => (
          <div
            key={item.id}
            className="border border-gray-300 rounded-lg shadow-md p-4 w-48 bg-white flex flex-col items-center hover:shadow-lg hover:border-blue-500 transition duration-200 cursor-pointer"
          >
            <h3 className="text-sm font-semibold text-gray-700 hover:text-blue-600">
              {item.name}
            </h3>
          </div>
        ))}
      </div>
    </>
  )}
</div>



  
}
