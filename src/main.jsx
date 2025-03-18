import { StrictMode } from "react";
import React from "react";
import ReactDOM from 'react-dom/client'
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import Store from "./Store/Store.js";
import Home from "./pages/Home.jsx";
import AuthLayout from "./component/AuthLayoutr.jsx";
import Login from "./pages/Login.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import AllPost from "./pages/AllPost.jsx";
import AddPost from "./pages/AddPost.jsx";
import EditPost from "./pages/EditPost.jsx";
import Post from "./pages/Post.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AllPost />
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AddPost />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditPost />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post/>
        },
    ],
},
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={Store}>
    <RouterProvider router={router}/>
    </Provider>
  </StrictMode>
);
