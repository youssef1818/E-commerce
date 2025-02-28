import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function ForgotPass() {
  const navigate= useNavigate()
 async function forgetPass(values){
    const res= await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',values)
    console.log(res)
    navigate('/reset-password')

  }


  const formik = useFormik({
    initialValues: {
      email: "",
      
    },
    onSubmit: forgetPass,
  });

  return (
<div className="max-w-md mx-auto p-6 bg-white light:bg-gray-900 rounded-lg shadow-md">
  <form onSubmit={formik.handleSubmit} className="space-y-4">
    {/*------ Email Input ------*/}
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700 light:text-gray-300"
      >
        Your Email
      </label>
      <input
        type="email"
        onChange={formik.handleChange}
        name="email"
        id="email"
        className="mt-1 w-full p-3 border border-gray-300 light:border-gray-600 bg-gray-50 light:bg-gray-800 text-gray-900 light:text-white rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
        placeholder="Enter your email"
      />
    </div>

    <button
      type="submit"
      className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2.5 rounded-lg transition duration-300"
    >
      Submit
    </button>
  </form>
</div>

  )
}
