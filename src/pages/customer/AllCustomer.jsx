import React, { useState } from "react";
import DataTable from "../components/DataTable";
import {
  Users,
  UserPlus,
  Phone,
  MapPin,
  Star,
  ShoppingBag,
  Shield,
  Download,
  BadgeCheck,
  Eye,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const AllCustomer = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  // Mock data
  const mockCustomers = [
    {
      id: 1,
      name: "Arjun Patel",
      email: "arjun@example.com",
      phone: "+91 98765 43210",
      location: "Mumbai, MH",
      totalOrders: 12,
      totalSpent: 45250,
      status: "active",
      loyaltyTier: "Gold",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya.s@example.com",
      phone: "+91 98765 43211",
      location: "Delhi, DL",
      totalOrders: 8,
      totalSpent: 28700,
      status: "active",
      loyaltyTier: "Silver",
      rating: 4.5,
    },
    {
      id: 3,
      name: "Rohan Mehta",
      email: "rohan.m@example.com",
      phone: "+91 98765 43212",
      location: "Bangalore, KA",
      totalOrders: 3,
      totalSpent: 8900,
      status: "active",
      loyaltyTier: "Bronze",
      rating: 4.2,
    },
  ];

  const filteredData = mockCustomers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchValue.toLowerCase()) ||
      customer.phone.includes(searchValue)
  );

  const columns = [
    {
      key: "name",
      title: "Customer",
      render: (value, item) => (
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-[#628141]/20 flex items-center justify-center">
            <span className="font-semibold text-[#628141]">
              {item.name.charAt(0)}
            </span>
          </div>
          <div className="ml-3">
            <div className="font-medium text-gray-900">{item.name}</div>
            <div className="text-xs text-gray-500">{item.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: "contact",
      title: "Contact",
      render: (_, item) => (
        <div>
          <div className="flex items-center text-sm text-gray-700">
            <Phone className="w-3 h-3 mr-1" />
            {item.phone}
          </div>
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <MapPin className="w-3 h-3 mr-1" />
            {item.location}
          </div>
        </div>
      ),
    },
    {
      key: "engagement",
      title: "Engagement",
      render: (_, item) => (
        <div>
          <div className="flex items-center">
            <ShoppingBag className="w-3 h-3 mr-1 text-gray-400" />
            <span className="text-sm font-medium">
              {item.totalOrders} orders
            </span>
          </div>
          <div className="text-xs text-gray-500">
            ₹{item.totalSpent.toLocaleString()} spent
          </div>
        </div>
      ),
    },
    {
      key: "loyaltyTier",
      title: "Tier",
      render: (value) => {
        const tierConfig = {
          Platinum: "bg-blue-100 text-blue-800",
          Gold: "bg-amber-100 text-amber-800",
          Silver: "bg-gray-100 text-gray-800",
          Bronze: "bg-orange-100 text-orange-800",
        };
        return (
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${
              tierConfig[value] || tierConfig.Bronze
            }`}
          >
            {value}
          </span>
        );
      },
    },
    {
      key: "rating",
      title: "Rating",
      render: (value) => (
        <div className="flex items-center">
          <Star className="w-4 h-4 text-amber-400 mr-1" />
          <span className="font-medium">{value}</span>
        </div>
      ),
    },
    {
      key: "status",
      title: "Status",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            value === "active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "actions",
      title: "Actions",
      render: (_, item) => (
        <button
          onClick={() => navigate(`/customers/${item.id}`)}
          className="p-1.5 rounded text-gray-600 hover:text-[#628141] hover:bg-gray-100"
          title="View"
        >
          <Eye className="w-4 h-4" />
        </button>
      ),
    },
  ];

  const stats = {
    totalCustomers: mockCustomers.length,
    activeCustomers: mockCustomers.filter((c) => c.status === "active").length,
    totalRevenue: mockCustomers.reduce((sum, c) => sum + c.totalSpent, 0),
    avgRating: (
      mockCustomers.reduce((sum, c) => sum + c.rating, 0) / mockCustomers.length
    ).toFixed(1),
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 rounded-xl bg-[#F0EBD9]">
                  <Users className="w-6 h-6 text-[#628141]" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Customers
                  </h1>
                  <p className="text-gray-600 mt-1">Manage your customers</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => toast.success("Exporting data...")}
                className="px-5 py-3 rounded-lg text-sm font-medium text-gray-700 border border-gray-300 hover:bg-white flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
              <button
                onClick={() => navigate("/customers/add")}
                className="px-5 py-3 rounded-lg text-sm font-medium text-white bg-[#628141] hover:bg-[#4A6A32] flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                Add Customer
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Customers</p>
                  <p className="text-xl font-bold text-gray-900">
                    {stats.totalCustomers}
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-blue-50">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active</p>
                  <p className="text-xl font-bold text-green-600">
                    {stats.activeCustomers}
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-green-50">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-xl font-bold text-gray-900">
                    ₹{(stats.totalRevenue / 1000).toFixed(0)}K
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-purple-50">
                  <ShoppingBag className="w-5 h-5 text-purple-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg. Rating</p>
                  <p className="text-xl font-bold text-gray-900">
                    {stats.avgRating}
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-amber-50">
                  <Star className="w-5 h-5 text-amber-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredData}
          title="All Customers"
          showSearch={true}
          onSearch={setSearchValue}
          searchValue={searchValue}
        />
      </div>
    </div>
  );
};

export default AllCustomer;
