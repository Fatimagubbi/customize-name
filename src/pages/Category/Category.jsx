import React, { useState } from "react";
import DataTable from "../components/DataTable";
import {
  Folder,
  Plus,
  Edit,
  Trash2,
  Tag,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { toast } from "react-hot-toast";

const Category = () => {
  const [searchValue, setSearchValue] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "active",
  });

  // Sample category data
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Premium Nameplates",
      description: "High-end luxury nameplates with premium materials",
      status: "active",
      productCount: 12,
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      name: "Office Nameplates",
      description: "Professional nameplates for corporate and office use",
      status: "active",
      productCount: 8,
      createdAt: "2024-01-10",
    },
    {
      id: 3,
      name: "Modern Design",
      description: "Contemporary and minimalist nameplate designs",
      status: "active",
      productCount: 15,
      createdAt: "2024-02-01",
    },
    {
      id: 4,
      name: "Traditional",
      description: "Classic and traditional nameplate styles",
      status: "inactive",
      productCount: 5,
      createdAt: "2024-01-20",
    },
    {
      id: 5,
      name: "Custom Nameplates",
      description: "Customizable nameplates with personalization options",
      status: "active",
      productCount: 23,
      createdAt: "2024-02-10",
    },
    {
      id: 6,
      name: "Eco-Friendly",
      description: "Environmentally friendly and sustainable nameplates",
      status: "active",
      productCount: 7,
      createdAt: "2024-02-15",
    },
    {
      id: 7,
      name: "Luxury Collection",
      description: "Exclusive luxury nameplates with premium finishes",
      status: "active",
      productCount: 9,
      createdAt: "2024-01-25",
    },
    {
      id: 8,
      name: "Budget Range",
      description: "Affordable nameplates for budget-conscious customers",
      status: "active",
      productCount: 18,
      createdAt: "2024-02-05",
    },
  ]);

  // Filter categories based on search
  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      category.description.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Calculate stats
  const stats = {
    totalCategories: categories.length,
    activeCategories: categories.filter((c) => c.status === "active").length,
    inactiveCategories: categories.filter((c) => c.status === "inactive")
      .length,
    totalProducts: categories.reduce((sum, c) => sum + c.productCount, 0),
  };

  // Table columns configuration
  const columns = [
    {
      key: "name",
      title: "Category Name",
      render: (value, item) => (
        <div className="flex items-center">
          <div className="p-2 rounded-lg bg-[#F0EBD9] mr-3">
            <Folder className="w-4 h-4 text-[#628141]" />
          </div>
          <div>
            <p className="font-medium text-gray-900">{value}</p>
            <p className="text-xs text-gray-500">
              {item.productCount} products
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "description",
      title: "Description",
      render: (value) => (
        <p className="text-sm text-gray-700 truncate max-w-xs">{value}</p>
      ),
    },
    {
      key: "status",
      title: "Status",
      render: (value) => {
        const statusConfig = {
          active: {
            color: "bg-green-100 text-green-800",
            icon: <CheckCircle className="w-3 h-3" />,
            label: "Active",
          },
          inactive: {
            color: "bg-red-100 text-red-800",
            icon: <XCircle className="w-3 h-3" />,
            label: "Inactive",
          },
        };
        const config = statusConfig[value] || statusConfig.active;
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${config.color}`}
          >
            {config.icon}
            {config.label}
          </span>
        );
      },
    },
    {
      key: "createdAt",
      title: "Created On",
      render: (value) => (
        <span className="text-sm text-gray-600">
          {new Date(value).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "actions",
      title: "Actions",
      render: (_, item) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleEdit(item)}
            className="p-1.5 rounded-lg text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-colors"
            title="Edit Category"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(item)}
            className="p-1.5 rounded-lg text-red-600 hover:text-red-800 hover:bg-red-50 transition-colors"
            title="Delete Category"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  // Event handlers
  const handleAdd = () => {
    setFormData({
      name: "",
      description: "",
      status: "active",
    });
    setShowAddModal(true);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      status: category.status,
    });
    setShowEditModal(true);
  };

  const handleDelete = (category) => {
    if (window.confirm(`Are you sure you want to delete "${category.name}"?`)) {
      setCategories(categories.filter((c) => c.id !== category.id));
      toast.success("Category deleted successfully!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (showEditModal && selectedCategory) {
        // Update existing category
        setCategories(
          categories.map((c) =>
            c.id === selectedCategory.id
              ? {
                  ...c,
                  ...formData,
                  updatedAt: new Date().toISOString().split("T")[0],
                }
              : c
          )
        );
        toast.success("Category updated successfully!");
      } else {
        // Add new category
        const newCategory = {
          id: categories.length + 1,
          ...formData,
          productCount: 0,
          createdAt: new Date().toISOString().split("T")[0],
        };
        setCategories([...categories, newCategory]);
        toast.success("Category added successfully!");
      }

      setIsLoading(false);
      setShowAddModal(false);
      setShowEditModal(false);
      setFormData({
        name: "",
        description: "",
        status: "active",
      });
    }, 800);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-[#628141]/10 to-[#8A9A5B]/20 border border-[#628141]/20">
                  <Folder className="w-6 h-6 text-[#628141]" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Category Management
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Organize and manage product categories
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleAdd}
              className="px-5 py-3 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-[#628141] to-[#8A9A5B] hover:from-[#4A6A32] hover:to-[#6B8E23] transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow"
            >
              <Plus className="w-4 h-4" />
              Add Category
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Categories</p>
                  <p className="text-xl font-bold text-gray-900">
                    {stats.totalCategories}
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-blue-50">
                  <Folder className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Categories</p>
                  <p className="text-xl font-bold text-green-600">
                    {stats.activeCategories}
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
                  <p className="text-sm text-gray-600">Inactive Categories</p>
                  <p className="text-xl font-bold text-red-600">
                    {stats.inactiveCategories}
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-red-50">
                  <XCircle className="w-5 h-5 text-red-500" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Products</p>
                  <p className="text-xl font-bold text-gray-900">
                    {stats.totalProducts}
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-purple-50">
                  <Tag className="w-5 h-5 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Table */}
        <DataTable
          columns={columns}
          data={filteredCategories}
          title="All Categories"
          showSearch={true}
          onSearch={setSearchValue}
          searchValue={searchValue}
        />

        {/* Category Management Tips */}
        <div className="mt-6 bg-gradient-to-r from-[#F8F5E6] to-[#F0EBD9] border border-[#E7DEAF] rounded-xl p-5">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-[#628141]/10 mt-0.5">
              <AlertCircle className="w-5 h-5 text-[#628141]" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">
                Category Management Tips
              </h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-start">
                  <span className="text-[#628141] mr-2">•</span>
                  Use descriptive category names that customers can easily
                  understand
                </li>
                <li className="flex items-start">
                  <span className="text-[#628141] mr-2">•</span>
                  Keep categories broad enough to group similar products
                  effectively
                </li>
                <li className="flex items-start">
                  <span className="text-[#628141] mr-2">•</span>
                  Regularly review and update categories to match your product
                  offerings
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Add Category Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {showEditModal ? "Edit Category" : "Add New Category"}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setShowEditModal(false);
                  setFormData({
                    name: "",
                    description: "",
                    status: "active",
                  });
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                {/* Category Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category Name *
                  </label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#628141] focus:border-[#628141] outline-none text-sm"
                      placeholder="Enter category name"
                      required
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#628141] focus:border-[#628141] outline-none text-sm"
                      placeholder="Enter category description"
                      rows="3"
                    />
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <div className="relative">
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#628141] focus:border-[#628141] outline-none appearance-none"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Inactive categories won't be shown to customers
                  </p>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setShowEditModal(false);
                    setFormData({
                      name: "",
                      description: "",
                      status: "active",
                    });
                  }}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-5 py-2 rounded-lg text-sm font-medium text-white bg-[#628141] hover:bg-[#4A6A32] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Processing...
                    </span>
                  ) : showEditModal ? (
                    "Update Category"
                  ) : (
                    "Add Category"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
