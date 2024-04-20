import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import ArtworkDetails from "./routes/ArtworkDetails.jsx";
import ArtworkCard from "./components/cards/ArtworkCard";

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
    children: [
      { index: true, element: <Index />, loader: Index.loader },
      {
        path: "/artwork/create",
        element: <CreateArtwork />,
        action: CreateArtwork.action,
      },
      {
        path: "/artwork/:id",
        element: <ArtworkCard />,
        loader: ArtworkCard.loader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
