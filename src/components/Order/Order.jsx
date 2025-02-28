import { useFormik } from 'formik';
import React, { useContext, useState } from 'react'
import { CartContext } from '../contexts/cartContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";


export default function Order() {
    const navigate= useNavigate()
    let [order,setOrder,]=useState()
    const {cartId,setNumCart}= useContext(CartContext)
    function handleSubmit(values){
        console.log('order')
        if (order=='cash'){
            cashOrder(values);
            setNumCart(0);
            toast.success('Ordered cash successfully')
            // navigate('/cart')

            setCar
        }else if(order=='visa'){
            visaOrder(values)
        }
    }
    async function cashOrder(values){
      try{

        console.log("cash")
        const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,values,{headers:{token:localStorage.getItem('token')}})
        console.log(res)
        // if(res.data.status=='success'){
          // navigate(res.data.session.success_url)
        // }
        

      }catch(err){
        console.log(err)
      }
    }
    async function visaOrder(values){
        console.log("visa")
        const res= await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${window.location.origin}`,values,{headers:{token:localStorage.getItem('token')}})
        console.log(res)
        window.open(res.data.session.url,'_blank')
    }

    const formik = useFormik({
        initialValues: {
            
                shippingAddress:{
                    details: "",
                    phone: "",
                    city: ""
                    }
            
        },
        onSubmit:handleSubmit
       
      });
  return <>
      <div>
        <form onSubmit={formik.handleSubmit}>
          {/*------ details Input ------*/}
          <div className="mb-5">
            <label
              htmlFor="details"
              className="block mb-2 font-medium text-gray-700 light:text-gray-300"
            >
              Details
            </label>
            <input
              type="text"
              
              onChange={(e)=>{formik.setFieldValue('shippingAddress.details',e.target.value)}}
              name="details"
              id="details"
              className="bg-gray-50 light:bg-gray-700 border border-gray-300 light:border-gray-600 text-gray-900 light:text-white rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            />
            </div>
          <div className="mb-5">
            <label
              htmlFor="phone"
              className="block mb-2 font-medium text-gray-700 light:text-gray-300"
            >
              phone
            </label>
            <input
              type="tel"
              
              onChange={(e)=>{formik.setFieldValue('shippingAddress.phone',e.target.value)}}
              name="phone"
              id="phone"
              className="bg-gray-50 light:bg-gray-700 border border-gray-300 light:border-gray-600 text-gray-900 light:text-white rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            />
            </div>
          <div className="mb-5">
            <label
              htmlFor="city"
              className="block mb-2 font-medium text-gray-700 light:text-gray-300"
            >
              city
            </label>
            <input
              type="text"
              
              onChange={(e)=>{formik.setFieldValue('shippingAddress.city',e.target.value)}}
              name="city"
              id="city"
              className="bg-gray-50 light:bg-gray-700 border border-gray-300 light:border-gray-600 text-gray-900 light:text-white rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            />
            </div>
    <button type='submit' onClick={()=>setOrder('cash')} className='bg-green-900 rounded m-2 p-2'>cash</button>
    <button type='submit' onClick={()=>setOrder('visa')} className='bg-green-900 rounded p-2'>visa</button>
            </form>
      
    </div>
  </>

  
}
