// src/pages/components/Sidebar.jsx
import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  ShoppingCart,
  ChevronDown,
  Tags,
  UserRound,
  BarChart3,
  Settings,
  Users,
  ClipboardList,
  ShoppingBag,
  Layers,
  Package,
  Users as UsersIcon,
  ShoppingCart as CartIcon,
} from "lucide-react";
import { LayoutDashboard, LogOut, Menu, X } from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Function to get user data from sessionStorage
  const getUserData = () => {
    try {
      const userStr = sessionStorage.getItem("user");
      if (userStr) {
        return JSON.parse(userStr);
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
    return null;
  };

  const getRole = () => {
    const userData = getUserData();
    return userData?.user?.role || userData?.role || "USER";
  };

  const getDisplayName = () => {
    const userData = getUserData();
    return (
      userData?.user?.name?.trim() ||
      (userData?.user?.email ? userData.user.email.split("@")[0] : null) ||
      (userData?.email ? userData.email.split("@")[0] : null) ||
      "User"
    );
  };

  const role = getRole();
  const displayName = getDisplayName();

  // Define navigation links directly
  const navLinks = useMemo(
    () => [
      {
        name: "Dashboard",
        icon: <LayoutDashboard className="w-5 h-5" />,
        path: "/dashboard",
        requiredRole: ["ADMIN", "USER"],
        showInSidebar: true,
      },
      {
        name: "Category",
        icon: <Layers className="w-5 h-5" />,
        path: "/category",
        requiredRole: ["ADMIN"],
        showInSidebar: true,
      },
      {
        name: "Products",
        icon: <Package className="w-5 h-5" />,
        path: "/products",
        requiredRole: ["ADMIN"],
        showInSidebar: true,
      },
      {
        name: "Customers",
        icon: <UsersIcon className="w-5 h-5" />,
        path: "/customers",
        requiredRole: ["ADMIN"],
        showInSidebar: true,
      },
      {
        name: "Orders",
        icon: <CartIcon className="w-5 h-5" />,
        path: "/orders",
        requiredRole: ["ADMIN"],
        showInSidebar: true,
      },
      {
        name: "Profile",
        icon: <UserRound className="w-5 h-5" />,
        path: "/profile",
        requiredRole: ["ADMIN", "USER"],
        showInSidebar: false,
      },
    ],
    []
  );

  // Role-based access control
  const hasAccess = (userRole, requiredRole) => {
    if (!requiredRole) return true;
    if (!userRole) return false;
    const allowed = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    return allowed.map((r) => r.toUpperCase()).includes(userRole.toUpperCase());
  };

  // Filter navigation links based on user role
  const filteredLinks = useMemo(() => {
    return navLinks.filter((link) => {
      const hasRoleAccess = hasAccess(role, link.requiredRole);
      const shouldShowInSidebar = link.showInSidebar !== false;
      return hasRoleAccess && shouldShowInSidebar;
    });
  }, [navLinks, role]);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Active title
  const currentTitle = useMemo(() => {
    const currentPath = location.pathname;
    const link = navLinks.find((link) => link.path === currentPath);
    if (link) {
      return link.name;
    }

    // Fallback: Convert path to title
    if (currentPath === "/") return "Dashboard";
    const pathName = currentPath.split("/").pop();
    return pathName.charAt(0).toUpperCase() + pathName.slice(1);
  }, [location.pathname, navLinks]);

  const initial = (displayName || "U")
    .toString()
    .trim()
    .charAt(0)
    .toUpperCase();

  // Handle logout
  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate("/");
  };

  // Debug info
  useEffect(() => {
    console.log("Sidebar Debug Info:");
    console.log("User Role:", role);
    console.log("User Display Name:", displayName);
    console.log("Filtered Links:", filteredLinks);
    console.log("Current Path:", location.pathname);
  }, [role, displayName, filteredLinks, location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 sm:hidden ${
          isSidebarOpen ? "opacity-100 z-30" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-all duration-300 ease-in-out border-r border-gray-200 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 bg-white`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="w-full h-20 flex items-center justify-center border-b border-gray-200 ">
            <div className="h-12 w-48 flex items-center justify-center">
              <h1 className="text-2xl font-bold text-[#628141]">Nexus Admin</h1>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-3 py-6 overflow-y-auto">
            <div className="mb-4 px-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Main Menu
              </p>
            </div>
            <ul className="space-y-2">
              {filteredLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <li key={link.path}>
                    <button
                      onClick={() => {
                        navigate(link.path);
                        setIsSidebarOpen(false);
                      }}
                      className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-[#628141] text-white shadow-md"
                          : "text-gray-700 hover:bg-gray-100 hover:text-[#628141]"
                      }`}
                    >
                      <span className="flex-shrink-0">
                        {React.cloneElement(link.icon, {
                          className: `w-5 h-5 ${
                            isActive ? "text-white" : "text-gray-500"
                          }`,
                        })}
                      </span>
                      <span className="ml-3 text-sm font-medium">
                        {link.name}
                      </span>
                      {/* {isActive && (
                        <span className="ml-auto w-2 h-2 rounded-full bg-white"></span>
                      )} */}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User Info in Sidebar */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-[#628141] flex items-center justify-center">
                <span className="text-white font-bold text-sm">{initial}</span>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {displayName}
                </p>
                <p className="text-xs text-gray-500 capitalize truncate">
                  {role.toLowerCase()}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="ml-2 p-2 rounded-md hover:bg-gray-200 transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`sm:ml-64 transition-all duration-300`}>
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 h-16 fixed top-0 right-0 left-0 sm:left-64 z-20">
          <div className="h-full px-4 sm:px-6 flex items-center justify-between">
            {/* Left side - Toggle & Title */}
            <div className="flex items-center gap-4">
              <button
                onClick={toggleSidebar}
                type="button"
                className="p-2 rounded-lg hover:bg-gray-100 sm:hidden"
              >
                {isSidebarOpen ? (
                  <X className="w-5 h-5 text-gray-600" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-600" />
                )}
              </button>

              <div className="flex flex-col">
                <h1 className="text-lg font-semibold text-gray-900">
                  {currentTitle}
                </h1>
                <p className="text-sm text-gray-500">
                  Welcome back, {displayName}
                </p>
              </div>
            </div>

            {/* Right side - Profile Dropdown */}
            <div
              className="flex items-center space-x-4 relative"
              ref={dropdownRef}
            >
              <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-[#628141] overflow-hidden border-2 border-gray-100 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {initial}
                    </span>
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-700">
                      {displayName}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {role.toLowerCase()}
                    </p>
                  </div>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-600 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isOpen && (
                <div className="absolute right-0 top-12 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      {displayName}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {role.toLowerCase()}
                    </p>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setIsOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <UserRound className="w-4 h-4 mr-3" />
                      My Profile
                    </button>
                    <button
                      onClick={() => {
                        navigate("/settings");
                        setIsOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <Settings className="w-4 h-4 mr-3" />
                      Settings
                    </button>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 mt-16 min-h-[calc(100vh-4rem)] bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Sidebar;
