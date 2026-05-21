import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Image as ImageIcon, Sparkles, Check, AlertCircle } from "lucide-react";
import { useAppStore } from "../store/useAppStore";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { apiService } from "../services/api";
import { useAuthStore } from "../store/useAuthStore";


const IMAGE_PRESETS = [
  {
    name: "Modern Laptop",
    url: "https://images.unsplash.com/photo-1496181130204-755241524eab?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Wireless Headphones",
    url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Smartphone Pro",
    url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Precision Smart Watch",
    url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Mechanical Keyboard",
    url: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
  },
];

const CATEGORIES = [
  "Laptops & Desktops",
  "Mobile & Tablets",
  "Audio & Wearables",
  "Displays & Accessories",
];

export function AddProduct() {
  const navigate = useNavigate();
  const {user} = useAuthStore()
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: CATEGORIES[0],
    price: "",
    stock: "",
    description: "",
    image: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const selectPresetImage = (url: string) => {
    setFormData((prev) => ({ ...prev, image: url }));
    if (errors.image) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.image;
        return next;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Product name is required.";
    if (!formData.brand.trim()) newErrors.brand = "Brand is required.";
    if (!formData.price.trim() || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = "Enter a valid positive price.";
    }
    if (!formData.stock.trim() || isNaN(Number(formData.stock)) || Number(formData.stock) < 0) {
      newErrors.stock = "Enter a valid stock number.";
    }
    if (!formData.description.trim()) newErrors.description = "Product description is required.";
    if (!formData.image.trim()) newErrors.image = "Product image URL is required.";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Scroll to the first error
      const firstErrorKey = Object.keys(newErrors)[0];
      const element = document.getElementsByName(firstErrorKey)[0];
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsSubmitting(true);

    try {
      // Trigger the actual backend API request
      const savedProduct = await apiService.createProduct({
        name: formData.name,
        brand: formData.brand,
        category: formData.category,
        price: Number(formData.price),
        stock: Math.floor(Number(formData.stock)),
        description: formData.description,
        image: formData.image,
      }, user);

      // Appending to the local Zustand state products list so that the dashboard shows it instantly!
      useAppStore.setState((state) => ({
        products: [savedProduct, ...state.products],
      }));

      setShowSuccessModal(true);
    } catch (err: any) {
      setErrors((prev) => ({
        ...prev,
        submit: err.message || "Failed to create product on backend"
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header Bar */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/admin/inventory")}
          className="p-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 rounded-full transition-all duration-200"
          title="Back to Inventory"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <div className="text-xs font-semibold text-blue-600 uppercase tracking-widest">Inventory Management</div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mt-1">Add New Product</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Form Panel */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
          <Card className="shadow-md rounded-2xl border border-slate-100 overflow-hidden bg-white">
            <CardHeader className="border-b border-slate-50 px-8 py-6">
              <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                Product Details
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-8 space-y-6">
              {/* Product Name */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Volt Pro Book M3"
                  className={`w-full px-4 py-3 bg-slate-50/50 border ${
                    errors.name ? "border-red-400 focus:ring-red-100" : "border-slate-200 focus:ring-blue-100"
                  } rounded-xl text-sm transition-all focus:ring-4 focus:border-blue-500 outline-none`}
                />
                {errors.name && (
                  <p className="text-xs text-red-500 font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
                  </p>
                )}
              </div>

              {/* Brand and Category Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Brand</label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    placeholder="e.g., VoltGadgets"
                    className={`w-full px-4 py-3 bg-slate-50/50 border ${
                      errors.brand ? "border-red-400 focus:ring-red-100" : "border-slate-200 focus:ring-blue-100"
                    } rounded-xl text-sm transition-all focus:ring-4 focus:border-blue-500 outline-none`}
                  />
                  {errors.brand && (
                    <p className="text-xs text-red-500 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.brand}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm transition-all focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none cursor-pointer"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price and Stock Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Price (INR)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-sm">₹</span>
                    <input
                      type="text"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="99,999"
                      className={`w-full pl-8 pr-4 py-3 bg-slate-50/50 border ${
                        errors.price ? "border-red-400 focus:ring-red-100" : "border-slate-200 focus:ring-blue-100"
                      } rounded-xl text-sm transition-all focus:ring-4 focus:border-blue-500 outline-none`}
                    />
                  </div>
                  {errors.price && (
                    <p className="text-xs text-red-500 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.price}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Stock Count</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    placeholder="e.g., 50"
                    min="0"
                    className={`w-full px-4 py-3 bg-slate-50/50 border ${
                      errors.stock ? "border-red-400 focus:ring-red-100" : "border-slate-200 focus:ring-blue-100"
                    } rounded-xl text-sm transition-all focus:ring-4 focus:border-blue-500 outline-none`}
                  />
                  {errors.stock && (
                    <p className="text-xs text-red-500 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.stock}
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Describe your premium hardware capabilities, features, dimensions..."
                  className={`w-full px-4 py-3 bg-slate-50/50 border ${
                    errors.description ? "border-red-400 focus:ring-red-100" : "border-slate-200 focus:ring-blue-100"
                  } rounded-xl text-sm transition-all focus:ring-4 focus:border-blue-500 outline-none resize-none`}
                />
                {errors.description && (
                  <p className="text-xs text-red-500 font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.description}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Product Media Card */}
          <Card className="shadow-md rounded-2xl border border-slate-100 overflow-hidden bg-white">
            <CardHeader className="border-b border-slate-50 px-8 py-6">
              <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-blue-600" />
                Product Imagery
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://images.unsplash.com/photo..."
                  className={`w-full px-4 py-3 bg-slate-50/50 border ${
                    errors.image ? "border-red-400 focus:ring-red-100" : "border-slate-200 focus:ring-blue-100"
                  } rounded-xl text-sm transition-all focus:ring-4 focus:border-blue-500 outline-none`}
                />
                {errors.image && (
                  <p className="text-xs text-red-500 font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.image}
                  </p>
                )}
              </div>

              {/* Image Presets Selector */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Or Select From Premium Presets</div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {IMAGE_PRESETS.map((preset) => {
                    const isSelected = formData.image === preset.url;
                    return (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => selectPresetImage(preset.url)}
                        className={`flex flex-col items-center gap-2 p-2 border-2 rounded-xl transition-all hover:bg-slate-50 text-center relative overflow-hidden ${
                          isSelected ? "border-blue-600 bg-blue-50/30" : "border-slate-100"
                        }`}
                      >
                        <img src={preset.url} alt={preset.name} className="w-12 h-12 rounded object-cover bg-slate-100" />
                        <span className="text-[10px] font-bold text-slate-700 truncate w-full">{preset.name}</span>
                        {isSelected && (
                          <div className="absolute top-1 right-1 bg-blue-600 text-white rounded-full p-0.5 shadow-sm">
                            <Check className="w-2.5 h-2.5" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4 flex-wrap">
            {errors.submit && (
              <p className="text-xs text-red-500 font-semibold flex items-center gap-1 mr-auto">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.submit}
              </p>
            )}
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/inventory")}
              className="px-6 py-2.5 rounded-full font-semibold border-slate-200 text-slate-700 hover:bg-slate-50 transition-all duration-200"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-2.5 rounded-full font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 shadow-md shadow-blue-200 flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" /> Save Product
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Right Preview Panel */}
        <div className="lg:sticky lg:top-28 space-y-6">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">Live Storefront Card Preview</div>
          <Card className="shadow-lg border-0 bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="relative aspect-[4/3] bg-slate-100 flex items-center justify-center overflow-hidden group">
              {formData.image ? (
                <img
                  src={formData.image}
                  alt={formData.name || "Product image"}
                  className="w-full h-full object-cover transition-transform duration-300"
                  onError={(e) => {
                    // Fallback if image fails to load
                    e.currentTarget.src = "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80";
                  }}
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-slate-400 p-4">
                  <ImageIcon className="w-12 h-12 opacity-40 animate-pulse" />
                  <span className="text-xs font-semibold">Image Preview</span>
                </div>
              )}
              {formData.stock && Math.floor(Number(formData.stock)) === 0 && (
                <span className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-sm">
                  Out of Stock
                </span>
              )}
            </div>

            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold tracking-widest text-blue-600 uppercase">
                  {formData.category || "Technology"}
                </span>
                <span className="text-xs font-bold text-slate-400">{formData.brand || "VoltGadgets"}</span>
              </div>

              <h3 className="font-bold text-lg text-slate-900 leading-snug line-clamp-1">
                {formData.name || "Unbranded Masterpiece"}
              </h3>

              <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 h-8">
                {formData.description || "A pristine hardware specimen engineered to provide unparalleled performance."}
              </p>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Retail Price</span>
                  <span className="text-xl font-extrabold text-slate-900">
                    ₹{formData.price ? Number(formData.price).toLocaleString() : "0"}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Stock</span>
                  <span className={`text-sm font-extrabold ${Number(formData.stock) < 15 ? "text-amber-600" : "text-green-600"}`}>
                    {formData.stock ? `${formData.stock} units` : "0 units"}
                  </span>
                </div>
              </div>

              <Button
                type="button"
                className="w-full bg-slate-950 text-white hover:bg-blue-600 font-semibold rounded-xl text-xs py-3 mt-2 shadow-sm pointer-events-none"
              >
                Add To Cart
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Success Modal overlay */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl border border-slate-100 space-y-6 transform scale-100 transition-all duration-300">
            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto border-2 border-green-200">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-slate-900">Product Created!</h2>
              <p className="text-slate-500 text-sm">
                <span className="font-bold text-slate-800">"{formData.name}"</span> has been added to your catalog successfully and loaded into active memory.
              </p>
            </div>

            <Button
              onClick={() => {
                setShowSuccessModal(false);
                navigate("/admin/inventory");
              }}
              className="w-full py-3 rounded-full font-bold bg-slate-900 text-white hover:bg-blue-600 transition-colors shadow-lg shadow-slate-100"
            >
              Continue to Inventory
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
