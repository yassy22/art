import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./routes/Root.jsx";
import ErrorPage from "./error-page.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ArtworkDetails from "./routes/ArtworkDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "artworks/:id",
        element: <ArtworkDetails />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
