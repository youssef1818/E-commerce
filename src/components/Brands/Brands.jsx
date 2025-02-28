import React, { useContext, useEffect } from 'react'
import { RestContext } from '../contexts/RestContext'
import LoadingScreen from '../LoadingScreen/LoadingScreen';

export default function Brands() {
   const {getAllBrands,allBrands,getSpecBrand}= useContext(RestContext);
   useEffect(()=>{
    getAllBrands()
   },[])
  return <>
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-gray-800 light:text-white text-center mb-8">
        Explore Brands
      </h2>

      {allBrands ? (
        <div  className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {allBrands.map((item) => (
            <a
              key={item.id}
              href="#"
              className="flex flex-col items-center bg-white light:bg-gray-800 border border-gray-200 light:border-gray-700 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1"
            >
              <img
                onClick={()=>{getSpecBrand(item._id) }}
                
                className="object-cover w-full h-56 md:h-48 rounded-t-lg"
                src={item.image}
                alt={item.name}
              />
              <div className="p-4 w-full text-center">
                <h5  className="text-xl font-semibold text-gray-900 light:text-white">
                  {item.name}
                </h5>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <LoadingScreen />
      )}
    </div>
  </>
}

