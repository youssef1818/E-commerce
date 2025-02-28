import axios from 'axios'
import React, { createContext, useState } from 'react'

export const RestContext=createContext()
export default function RestContextProvider({children}) {
    // const [id,setId]=useState()
    const[allCat,setAllCat]=useState()
    const[allProducts,setAllProducts]=useState()
    const[allSubCat,setAllSubCat]=useState()
    const[allBrands,setAllBrands]=useState()
    async function getCategories() {
        const res= await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
        console.log(res)
        setAllCat(res.data.data)
    }
    async function getSpecCat(id) {
        const res= await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
        console.log(res)
        // setAllCat(res.data.data)
    }
    async function getSubCat() {
      const res= await axios.get('https://ecommerce.routemisr.com/api/v1/subcategories')
      console.log(res);
      
    }
    async function getSpecSubCat(id) {
      const res= await axios.get(`https://ecommerce.routemisr.com/api/v1/subcategories/${id}`)
      // console.log(res);
      
      
    }
    async function getAllSubCat(id) {
      const res= await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
      console.log(res);
      setAllSubCat(res.data.data)
      
    }
    async function getAllBrands() {
      const res= await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
      console.log(res);
      // setId(res.data.data._id)
      setAllBrands(res.data.data);
      
    }
    async function getSpecBrand(id) {
      const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
      console.log(res)

    }
    async function getProduct() {
      const res= await axios.get("https://ecommerce.routemisr.com/api/v1/products");
      console.log(res)
      setAllProducts(res.data.data);
    }
    



    
  return <>
    <RestContext.Provider value={{getCategories,allCat,getSpecCat,getSubCat,getSpecSubCat,getAllBrands,allBrands,getSpecBrand,getAllSubCat,allSubCat,getProduct,allProducts}}>
        {children}
    </RestContext.Provider>
  </>
}
