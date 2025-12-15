// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  ShoppingBag,
  Users,
  DollarSign,
  Star,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Package,
  Eye,
  Filter,
  Download,
  FileText,
  Sparkles,
  Award,
  Target,
  Zap,
  BarChart3,
} from "lucide-react";

const Dashboard = () => {
  const [stats] = useState({
    totalOrders: 1542,
    totalRevenue: 450780,
    totalCustomers: 842,
    totalProducts: 56,
    pendingOrders: 23,
    completedOrders: 1289,
    activeDesigns: 24,
    customerSatisfaction: 4.7,
  });

  const [recentOrders] = useState([
    {
      id: "NP-00125",
      customer: "John Smith",
      product: "Gold Plated Nameplate",
      amount: 2499,
      status: "completed",
      date: "2024-01-15",
      customization: "Custom Font + Border",
    },
    {
      id: "NP-00126",
      customer: "Sarah Johnson",
      product: "Brass Office Nameplate",
      amount: 1899,
      status: "processing",
      date: "2024-01-15",
      customization: "Logo Engraving",
    },
    {
      id: "NP-00127",
      customer: "Mike Wilson",
      product: "Wooden Nameplate",
      amount: 1299,
      status: "pending",
      date: "2024-01-14",
      customization: "Laser Engraved",
    },
  ]);

  const [popularProducts] = useState([
    {
      id: 1,
      name: "Gold Plated Nameplate",
      category: "Premium",
      orders: 342,
      revenue: 854658,
      rating: 4.8,
      stock: 45,
    },
    {
      id: 2,
      name: "Brass Office Nameplate",
      category: "Office",
      orders: 289,
      revenue: 548910,
      rating: 4.6,
      stock: 32,
    },
    {
      id: 3,
      name: "Wooden Nameplate",
      category: "Home",
      orders: 256,
      revenue: 332544,
      rating: 4.7,
      stock: 18,
    },
    {
      id: 4,
      name: "Acrylic Desk Nameplate",
      category: "Modern",
      orders: 198,
      revenue: 178202,
      rating: 4.5,
      stock: 56,
    },
  ]);

  const [activityFeed] = useState([
    {
      id: 1,
      user: "John Smith",
      action: "placed a custom order",
      product: "Gold Plated Nameplate",
      time: "10 minutes ago",
      icon: <ShoppingBag className="w-4 h-4" />,
    },
    {
      id: 2,
      user: "Sarah Johnson",
      action: "uploaded custom design",
      product: "Brass Office Nameplate",
      time: "25 minutes ago",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: 3,
      user: "Design Team",
      action: "completed design proof",
      product: "Wooden Nameplate",
      time: "1 hour ago",
      icon: <CheckCircle className="w-4 h-4" />,
    },
    {
      id: 4,
      user: "Mike Wilson",
      action: "left a 5-star review",
      product: "Stainless Steel Nameplate",
      time: "2 hours ago",
      icon: <Star className="w-4 h-4" />,
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-50 text-green-700 border-green-200";
      case "processing":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "shipped":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "processing":
        return <Clock className="w-4 h-4" />;
      case "pending":
        return <AlertCircle className="w-4 h-4" />;
      case "shipped":
        return <Package className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Nameplate Designer Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your custom nameplate orders and designs
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center px-4 py-2.5 rounded-xl bg-[#F8F5E6] border border-[#E7DEAF]">
              <Calendar className="w-4 h-4 mr-2 text-[#628141]" />
              <span className="text-sm font-medium text-[#628141]">
                {new Date().toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Simple & Beautiful Stats Grid */}
      {/* Main Stats Grid - Simple & Aesthetic */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-8 sm:mb-10">
        {/* Total Orders */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Total Orders
              </p>
              <p className="mt-2 text-2xl sm:text-3xl font-semibold text-gray-900">
                {stats.totalOrders.toLocaleString()}
              </p>
              <p className="mt-1 text-xs text-gray-500">Last 30 days</p>
            </div>
            <div
              className="flex items-center justify-center w-10 h-10 rounded-full"
              style={{ backgroundColor: "#E7DEAF" }}
            >
              <ShoppingBag className="w-5 h-5" style={{ color: "#628141" }} />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="text-gray-500">Trend</span>
            <span className="flex items-center font-medium text-emerald-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12.5%
            </span>
          </div>
        </div>

        {/* Total Revenue */}
        <div
          className="rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-white"
          style={{ backgroundColor: "#628141" }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-white/80">
                Total Revenue
              </p>
              <p className="mt-2 text-2xl sm:text-3xl font-semibold">
                ₹{stats.totalRevenue.toLocaleString()}
              </p>
              <p className="mt-1 text-xs text-white/70">This month</p>
            </div>
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="text-white/70">Growth</span>
            <span className="flex items-center font-medium text-emerald-200">
              <TrendingUp className="w-3 h-3 mr-1" />
              +18.2%
            </span>
          </div>
        </div>

        {/* Total Customers */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Total Customers
              </p>
              <p className="mt-2 text-2xl sm:text-3xl font-semibold text-gray-900">
                {stats.totalCustomers.toLocaleString()}
              </p>

              <div className="mt-3">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>Repeat customers</span>
                  <span className="font-medium" style={{ color: "#628141" }}>
                    42%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: "42%", backgroundColor: "#628141" }}
                  />
                </div>
              </div>
            </div>
            <div
              className="flex items-center justify-center w-10 h-10 rounded-full"
              style={{ backgroundColor: "#E7DEAF" }}
            >
              <Users className="w-5 h-5" style={{ color: "#628141" }} />
            </div>
          </div>
        </div>

        {/* Customer Satisfaction */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Satisfaction
              </p>
              <div className="mt-2 flex items-center">
                <p className="text-2xl sm:text-3xl font-semibold text-gray-900 mr-2">
                  {stats.customerSatisfaction}
                </p>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 mr-0.5"
                      style={{
                        color:
                          i <= Math.floor(stats.customerSatisfaction)
                            ? "#FBBF24"
                            : "#E5E7EB",
                        fill:
                          i <= Math.floor(stats.customerSatisfaction)
                            ? "#FBBF24"
                            : "transparent",
                      }}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Based on {stats.totalCustomers} reviews
              </p>
            </div>
            <div
              className="flex items-center justify-center w-10 h-10 rounded-full"
              style={{ backgroundColor: "#FFF8E1" }}
            >
              <Award className="w-5 h-5" style={{ color: "#F59E0B" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Recent Orders Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Recent Orders
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Latest custom nameplate orders
              </p>
            </div>
            <button className="text-sm flex items-center px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
          </div>

          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="p-4 rounded-lg border border-gray-100 hover:border-[#628141]/30 hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <div className="p-2 rounded-lg mr-3 bg-[#F0EBD9]">
                      <ShoppingBag className="w-4 h-4 text-[#628141]" />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium text-gray-900">
                          {order.id}
                        </span>
                        <span
                          className={`ml-3 px-2 py-1 rounded-full text-xs font-medium flex items-center border ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {getStatusIcon(order.status)}
                          <span className="ml-1">
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </span>
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {order.customer}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-[#628141]">
                      ₹{order.amount.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{order.date}</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Product:</span>{" "}
                    {order.product}
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    <span className="font-medium">Customization:</span>{" "}
                    {order.customization}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100 flex justify-center">
            <button className="px-5 py-2.5 rounded-lg text-sm font-medium bg-[#628141] text-white hover:bg-[#4A6A32] transition-colors flex items-center">
              <Eye className="w-4 h-4 mr-2" />
              View All Orders
            </button>
          </div>
        </div>

        {/* Popular Products */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Popular Products
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Best-selling nameplate designs
              </p>
            </div>
            <button className="text-sm flex items-center px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>

          <div className="space-y-4">
            {popularProducts.map((product) => (
              <div
                key={product.id}
                className="p-4 rounded-lg border border-gray-100 hover:border-[#628141]/30 hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <div
                      className="p-3 rounded-lg mr-4"
                      style={{
                        backgroundColor:
                          product.category === "Premium"
                            ? "#FFF8E1"
                            : product.category === "Office"
                            ? "#E8F5E9"
                            : product.category === "Home"
                            ? "#FFF3E0"
                            : "#F3E5F5",
                      }}
                    >
                      <Package
                        className="w-5 h-5"
                        style={{
                          color:
                            product.category === "Premium"
                              ? "#FFB300"
                              : product.category === "Office"
                              ? "#4CAF50"
                              : product.category === "Home"
                              ? "#FF9800"
                              : "#9C27B0",
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">
                        {product.name}
                      </h4>
                      <div className="flex items-center mt-2">
                        <span
                          className="px-3 py-1 text-xs rounded-full font-medium mr-3"
                          style={{
                            backgroundColor: "#E7DEAF",
                            color: "#628141",
                          }}
                        >
                          {product.category}
                        </span>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          <span className="text-sm font-medium text-gray-700">
                            {product.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-[#628141]">
                      {product.orders}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">orders</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm text-gray-600">Revenue:</span>
                      <p className="font-bold text-lg mt-1 text-[#628141]">
                        ₹{product.revenue.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-600">Stock</span>
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-medium mt-1 ${
                          product.stock > 30
                            ? "bg-green-100 text-green-800"
                            : product.stock > 10
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.stock} units
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Status Summary */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Order Status
            </h3>
            <span className="text-sm text-gray-500">Overall distribution</span>
          </div>
          <div className="space-y-4">
            {[
              {
                status: "Completed",
                count: stats.completedOrders,
                color: "#10b981",
                percent: 83,
                icon: <CheckCircle className="w-4 h-4" />,
              },
              {
                status: "Processing",
                count: 230,
                color: "#3b82f6",
                percent: 15,
                icon: <Clock className="w-4 h-4" />,
              },
              {
                status: "Pending",
                count: stats.pendingOrders,
                color: "#f59e0b",
                percent: 1.5,
                icon: <AlertCircle className="w-4 h-4" />,
              },
              {
                status: "Shipped",
                count: 89,
                color: "#8b5cf6",
                percent: 5.5,
                icon: <Package className="w-4 h-4" />,
              },
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div
                      className="p-2 rounded-lg mr-3"
                      style={{ backgroundColor: `${item.color}20` }}
                    >
                      <div style={{ color: item.color }}>{item.icon}</div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {item.status}
                    </span>
                  </div>
                  <span className="font-bold text-gray-900">{item.count}</span>
                </div>
                <div className="flex items-center">
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${item.percent}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                  <span className="ml-3 text-sm font-medium text-gray-600 min-w-[40px]">
                    {item.percent}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Recent Activity
            </h3>
            <span className="text-sm text-gray-500">Latest updates</span>
          </div>
          <div className="space-y-4">
            {activityFeed.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <div className="p-3 rounded-lg mr-4 bg-[#E7DEAF]">
                  <div className="text-[#628141]">{activity.icon}</div>
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-semibold text-gray-900">
                      {activity.user}
                    </span>
                    <span className="text-gray-600"> {activity.action}</span>
                    {activity.product && (
                      <span className="font-medium ml-1 text-[#628141]">
                        "{activity.product}"
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
