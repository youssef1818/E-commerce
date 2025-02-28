import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  let [loading, setLoading] = useState(false);

  /*---------Validation Schema using Yup----------*/
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required("Name is required")
      .min(3, "Minimum 3 characters")
      .max(20, "Maximum 20 characters"),
    email: yup
      .string()
      .required("Email is required")
      .email("Please enter a valid email"),
    password: yup
      .string()
      .required("Password is required")
      .matches(/^[A-Za-z][A-Za-z0-9]{5,8}$/, "Invalid password format"),
    rePassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
    phone: yup
      .string()
      .required("Phone is required")
      .matches(/^[A-Za-z][A-Za-z0-9]{2,21}$/, "Invalid phone number format"),
  });

  /*---------Form Submission Function-------------*/
  async function register(values) {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      console.log(res);
      navigate("/login");
    } catch (err) {
      console.log(err.response);
    } finally {
      setLoading(false);
    }
  }

  /*------------Initialize Formik------------*/
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: register,
    validationSchema,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-gray-900 text-center mb-6">
          Create an Account
        </h2>

        <form onSubmit={formik.handleSubmit}>
          {/* Name Input */}
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium text-gray-700">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            />
            {formik.errors.name && formik.touched.name && (
              <div className="mt-1 text-sm text-red-600">{formik.errors.name}</div>
            )}
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium text-gray-700">
              Your Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            />
            {formik.errors.email && formik.touched.email && (
              <div className="mt-1 text-sm text-red-600">{formik.errors.email}</div>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            />
            {formik.errors.password && formik.touched.password && (
              <div className="mt-1 text-sm text-red-600">{formik.errors.password}</div>
            )}
          </div>

          {/* Confirm Password Input */}
          <div className="mb-4">
            <label htmlFor="rePassword" className="block font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="rePassword"
              id="rePassword"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            />
            {formik.errors.rePassword && formik.touched.rePassword && (
              <div className="mt-1 text-sm text-red-600">{formik.errors.rePassword}</div>
            )}
          </div>

          {/* Phone Input */}
          <div className="mb-4">
            <label htmlFor="phone" className="block font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            />
            {formik.errors.phone && formik.touched.phone && (
              <div className="mt-1 text-sm text-red-600">{formik.errors.phone}</div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-5 py-2.5 text-center rounded-lg font-medium transition duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            {loading ? "Registering..." : "Register Now"}
          </button>
        </form>

        {/* Additional Links */}
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-green-500 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
