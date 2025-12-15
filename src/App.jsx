// src/App.jsx
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./pages/components/Sidebar";
import { Toaster } from "react-hot-toast";
import Login from "./pages/onboarding/Login";
import NewRoutes from "./pages/routes/NewRoutes";
import ProtectedRoute from "./pages/routes/ProtectedRoutes";
import ForgotPassword from "./pages/onboarding/ForgotPassword";
import ResetPassword from "./pages/onboarding/ResetPassword";

// Additional pages

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Unauthorized Page */}
        <Route
          path="/unauthorized"
          element={
            <div className="flex items-center justify-center h-screen">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-red-600 mb-4">
                  Unauthorized Access
                </h1>
                <p className="text-gray-600">
                  You don't have permission to access this page.
                </p>
                <button
                  onClick={() => window.history.back()}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Go Back
                </button>
              </div>
            </div>
          }
        />

        {/* Protected Routes with Sidebar Layout */}
        <Route element={<Sidebar />}>
          {NewRoutes?.map(({ path, element, requiredRole }, index) => (
            <Route
              key={index}
              path={path}
              element={
                <ProtectedRoute element={element} requiredRole={requiredRole} />
              }
            />
          ))}
        </Route>

        {/* 404 Page - Keep this at the end */}
        <Route
          path="*"
          element={
            <div className="flex items-center justify-center h-screen">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                  404 - Page Not Found
                </h1>
                <p className="text-gray-600">
                  The page you're looking for doesn't exist.
                </p>
                <button
                  onClick={() => (window.location.href = "/")}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Go to Login
                </button>
              </div>
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
