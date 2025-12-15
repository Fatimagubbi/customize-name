import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  Package,
  ArrowLeft,
  Edit,
  Save,
  AlertCircle,
  BarChart3,
  Tag,
  DollarSign,
  Box,
  Info,
  Hash,
  Layers,
} from "lucide-react";

const EditProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const productFromState = location.state?.product || null;

  const [formData, setFormData] = useState(
    productFromState || {
      name: "",
      sku: "",
      category: "",
      price: "",
      stock: "",
      status: "active",
      rating: "",
      orders: "",
      material: "",
      size: "",
    }
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [originalData, setOriginalData] = useState(null);

  useEffect(() => {
    if (productFromState) {
      setOriginalData({ ...productFromState });
    } else {
      toast.error(
        "No product data found. Please open this page from Products list."
      );
      navigate("/products");
    }
  }, [productFromState, navigate]);

  useEffect(() => {
    if (originalData && formData) {
      const hasChanged = Object.keys(originalData).some(
        (key) => originalData[key]?.toString() !== formData[key]?.toString()
      );
      setHasChanges(hasChanged);
    }
  }, [formData, originalData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    // TODO: call API to update product
    // await axios.put(`/api/products/${id}`, formData)

    setIsSubmitting(false);
    toast.success("Product updated successfully!");
    navigate("/products");
  };

  const handleReset = () => {
    if (originalData) {
      setFormData({ ...originalData });
      toast("Changes reverted", { icon: "↩️" });
    }
  };

  const formSections = [
    {
      title: "Basic Information",
      description: "Core product identification details",
      icon: <Info className="w-4 h-4" />,
      fields: [
        {
          name: "name",
          label: "Product Name",
          type: "text",
          required: true,
          icon: <Package className="w-4 h-4" />,
        },
        {
          name: "sku",
          label: "SKU",
          type: "text",
          required: true,
          icon: <Hash className="w-4 h-4" />,
        },
        {
          name: "category",
          label: "Category",
          type: "text",
          placeholder: "Premium, Office, Modern, etc.",
          icon: <Tag className="w-4 h-4" />,
        },
      ],
    },
    {
      title: "Inventory & Pricing",
      description: "Stock management and pricing details",
      icon: <BarChart3 className="w-4 h-4" />,
      fields: [
        {
          name: "price",
          label: "Price (₹)",
          type: "number",
          required: true,
          min: "0",
          step: "0.01",
          icon: <DollarSign className="w-4 h-4" />,
        },
        {
          name: "stock",
          label: "Stock Quantity",
          type: "number",
          required: true,
          min: "0",
          icon: <Box className="w-4 h-4" />,
        },
        {
          name: "status",
          label: "Status",
          type: "select",
          options: [
            {
              value: "active",
              label: "Active",
              color: "text-green-600 bg-green-50",
            },
            {
              value: "low-stock",
              label: "Low Stock",
              color: "text-amber-600 bg-amber-50",
            },
            {
              value: "out-of-stock",
              label: "Out of Stock",
              color: "text-red-600 bg-red-50",
            },
            {
              value: "inactive",
              label: "Inactive",
              color: "text-gray-600 bg-gray-50",
            },
          ],
        },
      ],
    },
    {
      title: "Product Details",
      description: "Additional specifications and metrics",
      icon: <Layers className="w-4 h-4" />,
      fields: [
        {
          name: "rating",
          label: "Rating",
          type: "number",
          min: "0",
          max: "5",
          step: "0.1",
          placeholder: "0.0 - 5.0",
        },
        { name: "orders", label: "Total Orders", type: "number", min: "0" },
        {
          name: "material",
          label: "Material",
          type: "text",
          placeholder: "Brass, Acrylic, Wood, etc.",
        },
        {
          name: "size",
          label: "Size",
          type: "text",
          placeholder: "6x2 inches, Customizable, etc.",
        },
      ],
    },
  ];

  if (!productFromState) {
    return null;
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { label: "Active", className: "bg-green-100 text-green-800" },
      "low-stock": {
        label: "Low Stock",
        className: "bg-amber-100 text-amber-800",
      },
      "out-of-stock": {
        label: "Out of Stock",
        className: "bg-red-100 text-red-800",
      },
      inactive: { label: "Inactive", className: "bg-gray-100 text-gray-800" },
    };

    const config = statusConfig[status] || statusConfig.active;
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${config.className}`}
      >
        {config.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-white/60 transition-all duration-200 mb-4 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Products
          </button>

          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-[#628141]/10 to-[#8A9A5B]/20 border border-[#628141]/20">
                  <Edit className="w-6 h-6 text-[#628141]" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                    Edit Product
                  </h1>
                  <p className="text-gray-600 mt-2">
                    Update details for{" "}
                    <span className="font-semibold text-[#628141]">
                      {productFromState.name}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Main Form Container */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
          <form onSubmit={handleSubmit} className="divide-y divide-gray-100">
            {formSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-[#F0EBD9]">
                    {section.icon}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {section.title}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {section.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {section.fields.map((field) => {
                    const originalValue = originalData?.[field.name];
                    const currentValue = formData[field.name];
                    const hasFieldChanged =
                      originalValue?.toString() !== currentValue?.toString();

                    return (
                      <div key={field.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="flex items-center gap-1 text-sm font-medium text-gray-700">
                            {field.icon && (
                              <span className="text-gray-400">
                                {field.icon}
                              </span>
                            )}
                            {field.label}
                            {field.required && (
                              <span className="text-red-500">*</span>
                            )}
                          </label>
                          {hasFieldChanged && originalValue !== undefined && (
                            <div className="text-xs text-amber-600 flex items-center gap-1">
                              <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                              Changed
                            </div>
                          )}
                        </div>

                        {field.type === "select" ? (
                          <div className="relative">
                            <select
                              name={field.name}
                              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#628141]/30 focus:border-[#628141] transition-all duration-200 bg-white appearance-none"
                              value={formData[field.name]}
                              onChange={handleChange}
                              required={field.required}
                            >
                              {field.options?.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
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
                        ) : (
                          <div className="relative">
                            <input
                              type={field.type}
                              name={field.name}
                              className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:border-[#628141] transition-all duration-200 ${
                                hasFieldChanged
                                  ? "border-amber-300 bg-amber-50/30 focus:ring-amber-300/30"
                                  : "border-gray-300 focus:ring-[#628141]/30"
                              }`}
                              value={formData[field.name]}
                              onChange={handleChange}
                              placeholder={field.placeholder}
                              min={field.min}
                              max={field.max}
                              step={field.step}
                              required={field.required}
                            />
                            {field.name === "rating" && (
                              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                                /5
                              </div>
                            )}
                          </div>
                        )}

                        {hasFieldChanged && originalValue !== undefined && (
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <span className="text-gray-400">Original:</span>
                            <span className="font-medium">{originalValue}</span>
                          </div>
                        )}

                        {field.name === "stock" &&
                          formData.stock &&
                          parseInt(formData.stock) < 10 && (
                            <div className="text-xs text-amber-600 flex items-center gap-1">
                              <svg
                                className="w-3 h-3"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              Low stock warning (below 10 units)
                            </div>
                          )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Form Actions */}
            <div className="p-6 sm:p-8 bg-gradient-to-r from-gray-50 to-gray-100/50">
              <div className="flex flex-col sm:flex-row justify-between gap-3">
                <div className="flex flex-col sm:flex-row gap-3 order-2 sm:order-1">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-5 py-3 rounded-xl text-sm font-medium text-gray-600 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!hasChanges || isSubmitting}
                  >
                    Reset Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/products")}
                    className="px-5 py-3 rounded-xl text-sm font-medium text-gray-700 border border-gray-300 hover:bg-white hover:border-gray-400 transition-all duration-200 hover:shadow-sm"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                </div>
                <button
                  type="submit"
                  className={`px-8 py-3 rounded-xl text-sm font-medium text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 order-1 sm:order-2 ${
                    !hasChanges ? "opacity-80 cursor-not-allowed" : ""
                  }`}
                  style={{
                    backgroundColor: "#628141",
                    backgroundImage:
                      "linear-gradient(to bottom right, #628141, #8A9A5B)",
                  }}
                  disabled={!hasChanges || isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
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
                      Saving...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Save className="w-4 h-4" />
                      Save Changes
                    </span>
                  )}
                </button>
              </div>

              {/* Form Status Indicator */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        hasChanges
                          ? "bg-amber-500 animate-pulse"
                          : "bg-green-500"
                      }`}
                    ></div>
                    <span className="text-gray-600">
                      {hasChanges
                        ? "Unsaved changes detected"
                        : "All changes are saved"}
                    </span>
                  </div>
                  <div className="text-gray-500 text-xs">
                    Product ID: {id} • Last updated: Today
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        a{" "}
      </div>
    </div>
  );
};

export default EditProduct;
