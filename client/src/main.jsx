import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./routes/auth/login.jsx";

import Artwork from "./routes/artwork";

import CreateArtwork from "./routes/CreateArtwork";
import ErrorPage from "./error-page.jsx";
import "./index.css";
import Index from "./routes/index";

import Root from "./routes/root";

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
      },
      {
        path: "/artworks/:id",
        element: <Artwork />,
        loader: Artwork.loader,
      },
      {
        path: "/auth/login",
        element: <Login />,
        action: Login.action,
        loader: Login.loader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
