// src/pages/routes/NewRoutes.jsx
import React from "react";
import Dashboard from "../dashboard/Dashboard";
import Orders from "../orders/Orders";
import AllProducts from "../products/AllProducts";
import AllCustomer from "../customer/AllCustomer";
import Profile from "../profile/Profile";
import AddProduct from "../products/AddProduct";
import EditProduct from "../products/EditProduct";
import Category from "../Category/Category";

// Import your page components (create these placeholders first)

const NewRoutes = [
  // Admin-only routes
  {
    path: "/dashboard",
    element: <Dashboard />,
    requiredRole: ["ADMIN", "USER"], // Allow both roles
  },
  {
    path: "/orders",
    element: <Orders />,
    requiredRole: ["ADMIN", "USER"],
  },
  {
    path: "/category",
    element: <Category />,
    requiredRole: ["ADMIN", "USER"], // Keep as admin-only if needed
  },
  {
    path: "/products",
    element: <AllProducts />,
    requiredRole: ["ADMIN", "USER"],
  },
  {
    path: "/products/new",
    element: <AddProduct />,
    requiredRole: ["ADMIN"], // Keep as admin-only for adding products
  },
  {
    path: "/products/:id/edit",
    element: <EditProduct />,
    requiredRole: ["ADMIN"], // Keep as admin-only for editing
  },
  {
    path: "/customers",
    element: <AllCustomer />,
    requiredRole: ["ADMIN", "USER"],
  },
  {
    path: "/profile",
    element: <Profile />,
    requiredRole: null, // Allow all authenticated users
  },
];
export default NewRoutes;
