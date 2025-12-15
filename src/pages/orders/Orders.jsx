import React, { useState } from "react";
import { toast } from "react-hot-toast";
import DataTable from "../components/DataTable";
import {
  Package,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Phone,
  Eye,
  Download,
  Truck,
} from "lucide-react";

const Orders = () => {
  const [searchValue, setSearchValue] = useState("");
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Sample order data
  const [orders, setOrders] = useState([
    {
      id: "ORD-001",
      customer: "Arjun Patel",
      contact: "+91 98765 43210",
      items: ["Gold Plated Nameplate"],
      totalAmount: 2499,
      date: "2024-03-15",
      status: "pending",
      paymentMethod: "Credit Card",
    },
    {
      id: "ORD-002",
      customer: "Priya Sharma",
      contact: "+91 98765 43211",
      items: ["Brass Office Nameplate", "Wooden Nameplate"],
      totalAmount: 3198,
      date: "2024-03-14",
      status: "accepted",
      paymentMethod: "UPI",
    },
    {
      id: "ORD-003",
      customer: "Rohan Mehta",
      contact: "+91 98765 43212",
      items: ["Acrylic Desk Nameplate"],
      totalAmount: 899,
      date: "2024-03-14",
      status: "shipped",
      paymentMethod: "Debit Card",
    },
    {
      id: "ORD-004",
      customer: "Sneha Reddy",
      contact: "+91 98765 43213",
      items: ["Stainless Steel Nameplate", "LED Backlit Nameplate"],
      totalAmount: 8697,
      date: "2024-03-13",
      status: "delivered",
      paymentMethod: "Net Banking",
    },
    {
      id: "ORD-005",
      customer: "Vikram Singh",
      contact: "+91 98765 43214",
      items: ["Marble Nameplate"],
      totalAmount: 3499,
      date: "2024-03-13",
      status: "rejected",
      paymentMethod: "Credit Card",
      rejectionReason: "Item out of stock",
    },
  ]);

  // Filter orders based on search
  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchValue.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchValue.toLowerCase()) ||
      order.status.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Table columns configuration
  const columns = [
    {
      key: "id",
      title: "Order ID",
      render: (value, item) => (
        <div className="flex items-center">
          <div className="p-2 rounded-lg bg-blue-50 mr-3">
            <Package className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">{value}</p>
            <p className="text-xs text-gray-500">{item.date}</p>
          </div>
        </div>
      ),
    },
    {
      key: "customer",
      title: "Customer",
      render: (value, item) => (
        <div>
          <div className="flex items-center text-sm text-gray-900">
            <User className="w-3 h-3 mr-1" />
            {value}
          </div>
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <Phone className="w-3 h-3 mr-1" />
            {item.contact}
          </div>
        </div>
      ),
    },
    {
      key: "items",
      title: "Items",
      render: (value) => (
        <div className="max-w-xs">
          <p className="text-sm text-gray-900 truncate">{value.join(", ")}</p>
          <p className="text-xs text-gray-500 mt-1">{value.length} items</p>
        </div>
      ),
    },
    {
      key: "totalAmount",
      title: "Amount",
      render: (value) => (
        <div className="font-semibold text-gray-900">
          ₹{value.toLocaleString()}
        </div>
      ),
    },
    {
      key: "status",
      title: "Status",
      render: (value, item) => {
        const statusConfig = {
          pending: { color: "bg-yellow-100 text-yellow-800", label: "Pending" },
          accepted: { color: "bg-blue-100 text-blue-800", label: "Accepted" },
          shipped: { color: "bg-indigo-100 text-indigo-800", label: "Shipped" },
          delivered: {
            color: "bg-green-100 text-green-800",
            label: "Delivered",
          },
          rejected: { color: "bg-red-100 text-red-800", label: "Rejected" },
        };
        const config = statusConfig[value] || statusConfig.pending;
        return (
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${config.color}`}
          >
            {config.label}
          </span>
        );
      },
    },
    {
      key: "actions",
      title: "Actions",
      render: (_, item) => {
        const handleAccept = () => {
          if (window.confirm(`Accept order ${item.id}?`)) {
            setOrders(
              orders.map((o) =>
                o.id === item.id ? { ...o, status: "accepted" } : o
              )
            );
            toast.success(`Order ${item.id} accepted`);
          }
        };

        const handleReject = () => {
          setSelectedOrder(item);
          setShowRejectModal(true);
        };

        return (
          <div className="flex space-x-2">
            {item.status === "pending" && (
              <>
                <button
                  onClick={handleAccept}
                  className="p-1.5 rounded text-green-600 hover:text-green-800 hover:bg-green-50"
                  title="Accept"
                >
                  <CheckCircle className="w-4 h-4" />
                </button>
                <button
                  onClick={handleReject}
                  className="p-1.5 rounded text-red-600 hover:text-red-800 hover:bg-red-50"
                  title="Reject"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              </>
            )}
            <button
              onClick={() => toast.success(`Viewing order ${item.id}`)}
              className="p-1.5 rounded text-gray-600 hover:text-[#628141] hover:bg-gray-100"
              title="View"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        );
      },
    },
  ];

  // Calculate order stats
  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter((o) => o.status === "pending").length,
    acceptedOrders: orders.filter((o) => o.status === "accepted").length,
    totalRevenue: orders.reduce((sum, o) => sum + o.totalAmount, 0),
  };

  const confirmReject = () => {
    if (!rejectReason.trim()) {
      toast.error("Please provide a reason");
      return;
    }
    setOrders(
      orders.map((o) =>
        o.id === selectedOrder.id
          ? {
              ...o,
              status: "rejected",
              rejectionReason: rejectReason,
            }
          : o
      )
    );
    toast.success(`Order ${selectedOrder.id} rejected`);
    setShowRejectModal(false);
    setRejectReason("");
    setSelectedOrder(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 rounded-xl bg-blue-50">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
                  <p className="text-gray-600 mt-1">Manage customer orders</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => toast.success("Exporting data...")}
              className="px-5 py-3 rounded-lg text-sm font-medium text-gray-700 border border-gray-300 hover:bg-white flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-xl font-bold text-gray-900">
                    {stats.totalOrders}
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-blue-50">
                  <Package className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-xl font-bold text-yellow-600">
                    {stats.pendingOrders}
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-yellow-50">
                  <Clock className="w-5 h-5 text-yellow-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Accepted</p>
                  <p className="text-xl font-bold text-green-600">
                    {stats.acceptedOrders}
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-green-50">
                  <CheckCircle className="w-5 h-5 text-green-600" />
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
                  <Truck className="w-5 h-5 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredOrders}
          title="All Orders"
          showSearch={true}
          onSearch={setSearchValue}
          searchValue={searchValue}
        />

        {/* Reject Modal */}
        {showRejectModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Reject Order {selectedOrder?.id}
                </h3>
                <button
                  onClick={() => setShowRejectModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Rejection *
                </label>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  rows="3"
                  placeholder="Enter reason..."
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowRejectModal(false)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmReject}
                  disabled={!rejectReason.trim()}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-50"
                >
                  Confirm Reject
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
