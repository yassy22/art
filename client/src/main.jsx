import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import Login from "./routes/auth/login.jsx";
import Register from "./routes/auth/register.jsx";
import { logout } from "./services/auth";
import { action as destroyAction } from "./routes/destroy";
import EditArtwork from "./routes/artwork/editArtwork.jsx";

import Artwork from "./routes/artwork/artwork";

import CreateArtwork from "./routes/artwork/CreateArtwork.jsx";
import ErrorPage from "./error-page.jsx";
import "./index.css";
import Index from "./routes/index";
import User from "./routes/user";
import Root from "./routes/Root.jsx";
import "./index.css";
const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: Root.loader,

    children: [
      { index: true, element: <Index />, loader: Index.loader },
      {
        path: "/artwork/create",
        element: <CreateArtwork />,
        action: CreateArtwork.action,
        loader: CreateArtwork.loader,
        errorElement: <ErrorPage />,
      },
      {
        path: "/artworks/:id/edit",
        element: <EditArtwork />,
        loader: EditArtwork.loader,
        action: EditArtwork.action,
        errorElement: <ErrorPage />,
      },
      {
        path: "/artworks/:id",
        element: <Artwork />,
        loader: Artwork.loader,
        errorElement: <ErrorPage />,
      },

      {
        path: "/user/:id",
        element: <User />,
        loader: User.loader,
        errorElement: <ErrorPage />,
      },

      {
        path: "/login",
        element: <Login />,
        action: Login.action,
        loader: Login.loader,
        errorElement: <ErrorPage />,
      },

      {
        path: "/auth/logout",
        action: () => {
          logout();
          return redirect("/");
        },
      },
      {
        path: "artworks/:id/destroy",
        action: destroyAction,
        errorElement: <div>Oops! There was an error.</div>,
      },
    ],
  },

  {
    path: "register",
    element: <Register />,
    errorElement: <ErrorPage />,
    action: Register.action,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
