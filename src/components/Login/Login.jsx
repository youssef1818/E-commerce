import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import * as yup from "yup";
import axios from "axios";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  
  let { token, setToken } = useContext(AuthContext);
  let [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /*---------Validation Schema using Yup----------*/
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Please enter a valid email"),
    password: yup
      .string()
      .required("Password is required")
      .matches(/^[A-Za-z][A-Za-z0-9]{2,21}$/, "Invalid password format"),
  });

  /*---------Form Submission Function-------------*/
  async function login(values) {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      navigate("/");
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      console.log(err.response);
    } finally {
      setLoading(false);
    }
  }

  /*------------Initialize Formik------------*/
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: login,
    validationSchema,
  });

  return (
<div className="min-h-screen flex items-center justify-center bg-gray-100 light:bg-gray-900 px-4">
  <div className="w-full max-w-md bg-white light:bg-gray-800 p-8 rounded-lg shadow-lg">
    <h2 className="text-3xl font-semibold text-gray-900 light:text-white text-center mb-6">
      Login to Your Account
    </h2>

    <form onSubmit={formik.handleSubmit}>
      {/*------ Email Input ------*/}
      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-2 font-medium text-gray-700 light:text-gray-300"
        >
          Your Email
        </label>
        <input
          type="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          name="email"
          id="email"
          className="bg-gray-50 light:bg-gray-700 border border-gray-300 light:border-gray-600 text-gray-900 light:text-white rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
        />
        {formik.errors.email && formik.touched.email ? (
          <div className="mt-2 text-sm text-red-600 light:text-red-400">
            {formik.errors.email}
          </div>
        ) : null}
      </div>

      {/*------ Password Input ------*/}
      <div className="mb-3">
        <label
          htmlFor="password"
          className="block mb-2 font-medium text-gray-700 light:text-gray-300"
        >
          Your Password
        </label>
        <input
          type="password"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          name="password"
          id="password"
          className="bg-gray-50 light:bg-gray-700 border border-gray-300 light:border-gray-600 text-gray-900 light:text-white rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
        />
        {formik.errors.password && formik.touched.password ? (
          <div className="mt-2 text-sm text-red-600 light:text-red-400">
            {formik.errors.password}
          </div>
        ) : null}
      </div>

      {/*------ Forgot Password Link ------*/}
      <div className="mb-5 text-right">
        <a href="/forgot-password" className="text-sm text-green-500 hover:underline">
          Forgot Password?
        </a>
      </div>

      {/*------ Submit Button ------*/}
      <button
        type="submit"
        disabled={loading}
        className={`w-full px-5 py-2.5 text-center rounded-lg font-medium transition duration-300 ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600 text-white"
        }`}
      >
        {loading ? "Logging in..." : "Login Now"}
      </button>
    </form>

    {/*------ Loading Spinner (if needed) ------*/}
    {loading && (
      <div className="mt-4">
        <LoadingScreen />
      </div>
    )}

    {/*------ Additional Links ------*/}
    <div className="mt-4 text-center">
      <p className="text-gray-600 light:text-gray-300">
        Don't have an account?{" "}
        <a href="/register" className="text-green-500 hover:underline">
          Sign up here
        </a>
      </p>
    </div>
  </div>
</div>

  );
}
