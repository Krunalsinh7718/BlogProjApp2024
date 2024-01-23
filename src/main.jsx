import React from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Home from "./components/Home.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddEditPost from "./components/AddEditPost.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import AllPost from "./components/AllPost.jsx";
import PageLayout from "./PageLayout.jsx";
import EditPost from "./components/EditPost.jsx";
import Post from "./components/Post.jsx";
import { Provider } from 'react-redux'
import store from "./store/store.js";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/all-posts",
        element: (
        <PageLayout authentication>
          <AllPost />
        </PageLayout>
        ),
      },
      {
        path: "/add-post",
        element: (
        <PageLayout authentication>
          <AddEditPost />
        </PageLayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
        <PageLayout authentication>
          <AddEditPost />
        </PageLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: (
        <PageLayout authentication>
          <Post />
        </PageLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
    },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={routes} />
    <ToastContainer position="bottom-right"/>
  </Provider>
);
