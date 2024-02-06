import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  AddBlog,
  AllBlog,
  EditBlog,
  Home,
  Blog,
  SignIn,
  SignUp,
} from "./pages/";
import { AuthLayout, MainPageLayout } from "./components";
import { Provider } from "react-redux";
import Store from "./store/store.js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "/all-blog",
        element: (
          <AuthLayout authentication>
            <AllBlog />
          </AuthLayout>
        ),
      },
      {
        path: "/add-blog",
        element: (
          <AuthLayout authentication>
            <AddBlog />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-blog/:slug",
        element: (
          <AuthLayout authentication>
            <EditBlog />
          </AuthLayout>
        ),
      },
      {
        path: "/blog/:slug",
        element: <Blog />
      },
      {
        path: "/signin",
        element: (
          <AuthLayout authentication={false}>
            <SignIn />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <SignUp />
          </AuthLayout>
        ),
      },
    ],
  }

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={Store}>
      <RouterProvider router={routes} />
      <ToastContainer position="bottom-right" />
    </Provider>
  </React.StrictMode>
);
