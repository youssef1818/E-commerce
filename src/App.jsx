import React, { Children } from "react";
import Navbar from "./components/Navbar/Navbar";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import Products from "./components/Products/Products";
import Categories from "./components/Categories/Categories";
import Brands from "./components/Brands/Brands";
import Register from "./components/Register/Register";
import Error from "./components/Error/Error";
import Login from "./components/Login/Login";
import AuthContextProvider from "./components/contexts/AuthContext";
import Gaurd from "./components/Gaurd/Gaurd";
import AuthGaurd from "./components/AuthGaurd/AuthGaurd";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductDetails from "./components/ProductDetails/ProductDetails";

import CartContextProvider from "./components/contexts/cartContext";
import { Toaster } from "react-hot-toast";
import WishList from "./components/Wishlist/WishList";
import RestContextProvider from "./components/contexts/RestContext";
import Order from "./components/Order/Order";
import AllOrders from "./components/AllOrders/AllOrders";
import ForgotPassword from "./components/ForgotPass/ForgotPass";
import ResetPass from "./components/ResetPass/ResetPass";
import NewPass from "./components/NewPass/NewPass";

const queryClient = new QueryClient();
const routes = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Gaurd>
            <Home />
          </Gaurd>
        ),
      },
      {
        path: "cart",
        element: (
          <Gaurd>
            <Cart />
          </Gaurd>
        ),
      },
      {
        path: "products",
        element: (
          <Gaurd>
            <Products />
          </Gaurd>
        ),
      },
      {
        path: "wishlist",
        element: (
          <Gaurd>
            <WishList />
          </Gaurd>
        ),
      },
      {
        path: "categories",
        element: (
          <Gaurd>
            <Categories />
          </Gaurd>
        ),
      },
      {
        path: "brands",
        element: (
          <Gaurd>
            <Brands />
          </Gaurd>
        ),
      },
      {
        path: "details/:id",
        element: (
          <Gaurd>
            <ProductDetails />
          </Gaurd>
        ),
      },
     { 
        path: "order",
        element: (
          <Gaurd>
            <Order />
          </Gaurd>
        ),
      },
     { 
        path: "allorders",
        element: (
          <Gaurd>
            <AllOrders />
          </Gaurd>
        ),
      },
      {
        path: "login",
        element: (
          <AuthGaurd>
            <Login />
          </AuthGaurd>
        ),
      },
      {
        path: "forgot-password",
        element: (
          <AuthGaurd>
            <ForgotPassword />
          </AuthGaurd>
        ),
      },
      {
        path: "reset-password",
        element: (
          <AuthGaurd>
            <ResetPass />
          </AuthGaurd>
        ),
      },
      {
        path: "newPass",
        element: (
          <AuthGaurd>
            <NewPass />
          </AuthGaurd>
        ),
      },
      {
        path: "register",
        element: (
          <AuthGaurd>
            <Register />
          </AuthGaurd>
        ),
      },
      { path: "*", element: <Error /> },
    ],
  },
]);

export default function App() {
  return (
    <>
      <AuthContextProvider>
        <RestContextProvider>
          <CartContextProvider>
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={routes} />
              <Toaster position="top-right" />
            </QueryClientProvider>
          </CartContextProvider>
        </RestContextProvider>
      </AuthContextProvider>
    </>
  );
}
