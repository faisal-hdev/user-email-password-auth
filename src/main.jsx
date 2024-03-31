/* eslint-disable no-unused-vars */
import "./index.css";
import React from "react";
import Root from "./root/Root";
import Home from "./components/Home";
import Login from "./components/Login";
import ReactDOM from "react-dom/client";
import Register from "./components/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HeroRegister from "./components/HeroRegister";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/heroRegister", element: <HeroRegister /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router}></RouterProvider>
  </>
);
