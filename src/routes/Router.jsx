import { createBrowserRouter } from "react-router";

import RootLayout from "../layouts/RootLayout";
import ProtectedLayout from "../layouts/ProtectedLayout";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import About from "../pages/About";
import ProductDetail from "../pages/ProductDetail";
import PublicLayout from "../layouts/PublicLayout";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <PublicLayout />,
        children: [
          { path: "/login", element: <Login /> },
          { path: "/register", element: <Register /> },
        ],
      },
      {
        element: <ProtectedLayout />,
        children: [
          { path: "/", element: <Home /> },
          { path: "/shop", element: <Shop /> },
          { path: "/about", element: <About /> },
          { path: "/product/:id", element: <ProductDetail /> },
        ],
      },
    ],
  },
]);

export default router;
