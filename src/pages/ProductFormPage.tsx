//ProductFromPage.tsx

import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { ArrowLeftIcon, PlusIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import type { Category, Product, NewProductInput } from "my-types";
import { getAllCategories } from "../api/categoryapi";
import { createProduct, updateProduct } from "../api/productapi";

const inputClass =
  "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20";

const labelClass = "block text-xs font-medium text-gray-600 mb-1";

const emptyForm: NewProductInput = {
  title: "",
  description: "",
  price: 0,
  discountPercentage: 0,
  rating: 0,
  stock: 0,
  categoryId: 0,
};

const ProductFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  const isEditing = id !== undefined;

  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState<NewProductInput>(emptyForm);

  useEffect(() => {
    getAllCategories().then(setCategories);

    if (isEditing && location.state?.product) {
      const product = location.state.product as Product;
      setForm({
        title: product.title,
        description: product.description,
        price: product.price,
        discountPercentage: product.discountPercentage,
        rating: product.rating,
        stock: product.stock,
        categoryId: product.categoryId,
      });
    }
  }, []);

  const handleChange = (field: keyof NewProductInput, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      updateProduct(Number(id), form).then(() => navigate("/product"));
    } else {
      createProduct(form).then(() => navigate("/product"));
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">

          {/* Header */}
          <div className="border-b border-blue-200 bg-blue-50 px-4 py-3 flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/products")}
              className="text-blue-700 hover:text-blue-900"
            >
              <ArrowLeftIcon className="h-4 w-4" />
            </button>
            {isEditing
              ? <PencilSquareIcon className="h-4 w-4 text-blue-700" />
              : <PlusIcon className="h-4 w-4 text-blue-700" />
            }
            <p className="text-sm font-semibold text-blue-900">
              {isEditing ? "Edit Product" : "New Product"}
            </p>
          </div>

          {/* Form body */}
          <div className="px-6 py-6 space-y-5">

            {/* Title — full width */}
            <div>
              <label className={labelClass}>Title</label>
              <input
                type="text"
                required
                className={inputClass}
                placeholder="Product title"
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </div>

            {/* Description — full width */}
            <div>
              <label className={labelClass}>Description</label>
              <textarea
                required
                rows={3}
                className={inputClass + " resize-none"}
                placeholder="Product description"
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>

            {/* Two-column grid */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-5">

              <div>
                <label className={labelClass}>Price ($)</label>
                <input
                  type="number"
                  required
                  min={0}
                  step="0.01"
                  className={inputClass}
                  placeholder="0.00"
                  value={form.price || ""}
                  onChange={(e) => handleChange("price", parseFloat(e.target.value) || 0)}
                />
              </div>

              <div>
                <label className={labelClass}>Stock</label>
                <input
                  type="number"
                  required
                  min={0}
                  className={inputClass}
                  placeholder="0"
                  value={form.stock || ""}
                  onChange={(e) => handleChange("stock", parseInt(e.target.value) || 0)}
                />
              </div>

              <div>
                <label className={labelClass}>Discount (%)</label>
                <input
                  type="number"
                  required
                  min={0}
                  max={100}
                  step="0.1"
                  className={inputClass}
                  placeholder="0.0"
                  value={form.discountPercentage || ""}
                  onChange={(e) => handleChange("discountPercentage", parseFloat(e.target.value) || 0)}
                />
              </div>

              <div>
                <label className={labelClass}>Rating (0 – 5)</label>
                <input
                  type="number"
                  required
                  min={0}
                  max={5}
                  step="0.1"
                  className={inputClass}
                  placeholder="0.0"
                  value={form.rating || ""}
                  onChange={(e) => handleChange("rating", parseFloat(e.target.value) || 0)}
                />
              </div>

              <div className="col-span-2">
                <label className={labelClass}>Category</label>
                <select
                  required
                  className={inputClass}
                  value={form.categoryId || ""}
                  onChange={(e) => handleChange("categoryId", parseInt(e.target.value) || 0)}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 border-t border-gray-200 px-6 py-4">
            <button
              type="button"
              onClick={() => navigate("/product")}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            >
              {isEditing
                ? <><PencilSquareIcon className="h-4 w-4" /> Save Changes</>
                : <><PlusIcon className="h-4 w-4" /> Save Product</>
              }
            </button>
          </div>

        </div>
      </form>
    </div>
  );
};

export default ProductFormPage;



