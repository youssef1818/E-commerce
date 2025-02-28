import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function NewPass() {
  const navigate= useNavigate()
    let [newToken,setNewToken]=useState()
    async function newPassword(values) {
        const res = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',values);
        console.log(res)

        navigate('/login')
        
    }


    const formik = useFormik({
        initialValues: {
          email: "",
          newPassword: "",
        },
        onSubmit: newPassword,
        
      });
    
  return (
<div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
  <form 
    onSubmit={formik.handleSubmit} 
    className="w-full max-w-md bg-white shadow-lg rounded-xl p-6"
  >
    <div className="mb-5">
      <label htmlFor="email" className="block mb-2 font-medium text-gray-700">
        Your Email
      </label>
      <input
        type="email"
        onChange={formik.handleChange}
        name="email"
        id="email"
        className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:ring-green-500 focus:border-green-500 transition"
      />
    </div>

    <div className="mb-5">
      <label htmlFor="newPassword" className="block mb-2 font-medium text-gray-700">
        Your Password
      </label>
      <input
        type="password"
        onChange={formik.handleChange}
        name="newPassword"
        id="newPassword"
        className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:ring-green-500 focus:border-green-500 transition"
      />
    </div>

    <button
      type="submit"
      className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-lg transition duration-300"
    >
      Submit
    </button>
  </form>
</div>

  )
}
