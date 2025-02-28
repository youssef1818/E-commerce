import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function ResetPass() {
    const navigate= useNavigate()
 async function resetCode(values){
    values.resetCode = String(values.resetCode);
    const res= await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',values)
    // console.log(values)
    console.log(res)
    navigate('/newPass')
  }


  const formik = useFormik({
    initialValues: {
        resetCode: "",
      
    },
    onSubmit: resetCode,
  });

  return <>
    <div className="max-w-md mx-auto p-6 bg-white light:bg-gray-900 rounded-lg shadow-md">
  <form onSubmit={formik.handleSubmit} className="space-y-4">
    
    <div>
      <label
        htmlFor="code"
        className="block text-sm font-medium text-gray-700 light:text-gray-300"
      >
        verify code
      </label>
      <input
        
        onChange={formik.handleChange}
        name="resetCode"
        id="code"
        className="mt-1 w-full p-3 border border-gray-300 light:border-gray-600 bg-gray-50 light:bg-gray-800 text-gray-900 light:text-white rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
        placeholder="Enter your code"
      />
    </div>
    <button>submit</button>
    <button
      type="submit"
      className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2.5 rounded-lg transition duration-300"
    >
    </button>
  </form>
</div>

  </>
}
