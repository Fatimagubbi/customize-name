import React, { useState } from "react";
import DataTable from "../components/DataTable";
import {
  Package,
  Star,
  Clock,
  AlertTriangle,
  Edit,
  Trash2,
  Eye,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const AllProducts = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  // Sample product data
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Gold Plated Nameplate",
      sku: "NP-GLD-001",
      category: "Premium",
      price: 2499,
      stock: 45,
      status: "active",
      rating: 4.8,
      orders: 342,
    },
    {
      id: 2,
      name: "Brass Office Nameplate",
      sku: "NP-BRS-002",
      category: "Office",
      price: 1899,
      stock: 32,
      status: "active",
      rating: 4.6,
      orders: 289,
    },
    {
      id: 3,
      name: "Wooden Nameplate",
      sku: "NP-WDN-003",
      category: "Home",
      price: 1299,
      stock: 18,
      status: "low-stock",
      rating: 4.7,
      orders: 256,
    },
    {
      id: 4,
      name: "Acrylic Desk Nameplate",
      sku: "NP-ACR-004",
      category: "Modern",
      price: 899,
      stock: 56,
      status: "active",
      rating: 4.5,
      orders: 198,
    },
    {
      id: 5,
      name: "Stainless Steel Nameplate",
      sku: "NP-STL-005",
      category: "Premium",
      price: 2199,
      stock: 24,
      status: "active",
      rating: 4.9,
      orders: 187,
    },
  ]);

  // Filter products based on search
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchValue.toLowerCase()) ||
      product.category.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Table columns configuration
  const columns = [
    {
      key: "name",
      title: "Product Name",
      render: (value, item) => (
        <div className="flex items-center">
          <div className="p-2 rounded-lg bg-[#F0EBD9] mr-3">
            <Package className="w-4 h-4 text-[#628141]" />
          </div>
          <div>
            <p className="font-medium text-gray-900">{value}</p>
            <p className="text-xs text-gray-500">{item.sku}</p>
          </div>
        </div>
      ),
    },
    {
      key: "category",
      title: "Category",
      render: (value) => (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#E7DEAF] text-[#628141]">
          {value}
        </span>
      ),
    },
    {
      key: "price",
      title: "Price",
      render: (value) => `₹${value.toLocaleString()}`,
    },
    {
      key: "stock",
      title: "Stock",
      render: (value) => {
        if (value === 0) {
          return <span className="text-red-600 text-sm">Out of Stock</span>;
        } else if (value < 10) {
          return <span className="text-amber-600 text-sm">{value} (Low)</span>;
        } else {
          return <span className="text-green-600 text-sm">{value}</span>;
        }
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
      render: (value) => {
        const colors = {
          active: "bg-green-100 text-green-800",
          "low-stock": "bg-amber-100 text-amber-800",
          inactive: "bg-red-100 text-red-800",
        };
        return (
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${
              colors[value] || "bg-gray-100"
            }`}
          >
            {value}
          </span>
        );
      },
    },
    {
      key: "actions",
      title: "Actions",
      render: (_, item) => (
        <div className="flex space-x-2">
          <button
            onClick={() => navigate(`/products/${item.id}`)}
            className="p-1.5 rounded text-gray-600 hover:text-[#628141] hover:bg-gray-100"
            title="View"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate(`/products/${item.id}/edit`)}
            className="p-1.5 rounded text-blue-600 hover:text-blue-800 hover:bg-blue-50"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              if (window.confirm(`Delete "${item.name}"?`)) {
                setProducts(products.filter((p) => p.id !== item.id));
                toast.success("Product deleted");
              }
            }}
            className="p-1.5 rounded text-red-600 hover:text-red-800 hover:bg-red-50"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  // Calculate stats
  const stats = {
    totalProducts: products.length,
    outOfStock: products.filter((p) => p.stock === 0).length,
    lowStock: products.filter((p) => p.stock > 0 && p.stock < 10).length,
    avgRating: (
      products.reduce((sum, p) => sum + p.rating, 0) / products.length
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
                  <Package className="w-6 h-6 text-[#628141]" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                  <p className="text-gray-600 mt-1">Manage your products</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate("/products/new")}
              className="px-5 py-3 rounded-lg text-sm font-medium text-white bg-[#628141] hover:bg-[#4A6A32] flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Products</p>
                  <p className="text-xl font-bold text-gray-900">
                    {stats.totalProducts}
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
                  <p className="text-sm text-gray-600">Out of Stock</p>
                  <p className="text-xl font-bold text-red-600">
                    {stats.outOfStock}
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-red-50">
                  <Clock className="w-5 h-5 text-red-500" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Low Stock</p>
                  <p className="text-xl font-bold text-amber-600">
                    {stats.lowStock}
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-amber-50">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
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
                <div className="p-2 rounded-lg bg-green-50">
                  <Star className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredProducts}
          title="All Products"
          showSearch={true}
          onSearch={setSearchValue}
          searchValue={searchValue}
        />
      </div>
    </div>
  );
};

export default AllProducts;
