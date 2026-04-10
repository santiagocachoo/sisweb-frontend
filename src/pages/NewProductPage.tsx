import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon, PlusIcon } from "@heroicons/react/24/outline";
import type { Category, NewProductInput } from "my-types";
import { getAllCategories } from "../api/categoryapi";
import { createProduct } from "../api/productapi";

const inputClass =
  "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20";
const labelClass = "mb-1 block text-xs font-medium text-gray-600";

const emptyForm: NewProductInput = {
  title: "",
  description: "",
  price: 0,
  discountPercentage: 0,
  rating: 0,
  stock: 0,
  categoryId: 0,
};

const NewProductPage: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState<NewProductInput>(emptyForm);

  useEffect(() => {
    getAllCategories().then(setCategories);
  }, []);

  const handleChange = (
    field: keyof NewProductInput,
    value: string | number,
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createProduct(form).then(() => navigate("/product"));
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-blue-200 bg-blue-50 px-4 py-3">
            <button
              type="button"
              onClick={() => navigate("/product")}
              className="text-blue-700 hover:text-blue-900"
              aria-label="Back to products"
            >
              <ArrowLeftIcon className="h-4 w-4" />
            </button>

            <PlusIcon className="h-4 w-4 text-blue-700" />

            <p className="text-sm font-semibold text-blue-900">New Product</p>
          </div>

          <div className="grid gap-4 px-6 py-6 md:grid-cols-2">
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

            <div>
              <label className={labelClass}>Category</label>
              <select
                required
                className={inputClass}
                value={form.categoryId || ""}
                onChange={(e) =>
                  handleChange("categoryId", parseInt(e.target.value) || 0)
                }
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>Description</label>
              <textarea
                required
                className={inputClass}
                placeholder="Product description"
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass}>Price</label>
              <input
                type="number"
                min={0}
                step="0.01"
                required
                className={inputClass}
                value={form.price || ""}
                onChange={(e) =>
                  handleChange("price", parseFloat(e.target.value) || 0)
                }
              />
            </div>

            <div>
              <label className={labelClass}>Stock</label>
              <input
                type="number"
                min={0}
                required
                className={inputClass}
                value={form.stock || ""}
                onChange={(e) =>
                  handleChange("stock", parseInt(e.target.value) || 0)
                }
              />
            </div>

            <div>
              <label className={labelClass}>Discount percentage</label>
              <input
                type="number"
                min={0}
                step="0.1"
                required
                className={inputClass}
                value={form.discountPercentage || ""}
                onChange={(e) =>
                  handleChange(
                    "discountPercentage",
                    parseFloat(e.target.value) || 0,
                  )
                }
              />
            </div>

            <div>
              <label className={labelClass}>Rating</label>
              <input
                type="number"
                min={0}
                max={5}
                step="0.1"
                required
                className={inputClass}
                value={form.rating || ""}
                onChange={(e) =>
                  handleChange("rating", parseFloat(e.target.value) || 0)
                }
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t border-gray-200 px-6 py-4">
            <button
              type="button"
              onClick={() => navigate("/product")}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
            >
              <PlusIcon className="h-4 w-4" />
              Save Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewProductPage;
