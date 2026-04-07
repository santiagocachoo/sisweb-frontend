import {
  PhotoIcon,
  TrashIcon,
  PencilIcon,
  ShoppingCartIcon
} from "@heroicons/react/24/outline";
import { useState, useEffect, useMemo } from "react";
import type { Product, Category } from "my-types";
import { getAllProducts, deleteProduct } from "../api/productapi";
import { getAllCategories } from "../api/categoryapi";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

interface Props {}

const inputClassName = "w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200";
const tableHeadingClassName = "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500";


const SortIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="m8 15 4 4 4-4m0-6-4-4-4 4"
    />
  </svg>
);

const ProductPage: React.FC<Props> = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [titleQuery, setTitleQuery] = useState("");
  const [descriptionQuery, setDescriptionQuery] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  useEffect(() => {
    getAllProducts().then((products:Product[]) => setProducts(products));
    getAllCategories().then((categories: Category[]) => setCategories(categories));
  }, []);

  const filteredProducts = useMemo(() => {
    console.log(products);
    const _title = titleQuery.trim().toLowerCase();
    const _description = descriptionQuery.trim().toLowerCase();

    return products.filter((p) => {
      const matchesTitle = _title.length === 0 || p.title.toLowerCase().includes(_title);

      const matchesDescription = _description.length === 0 || p.description.toLowerCase().includes(_description);

      const matchesCategory = categoryId === null || p.categoryId === categoryId;

      return matchesTitle && matchesDescription && matchesCategory;
    });
  }, [descriptionQuery, titleQuery, categoryId, products]);

  const handleDelete = () => {
  if (!productToDelete) return;
    deleteProduct(productToDelete.id).then(() => {
      setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
      setProductToDelete(null);
    });
  };


  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-5">
          <ShoppingCartIcon className="h-4 w-4 text-blue-700" />
          <p className="mt-1 text-xl font-semibold text-gray-900">All Products</p>
        </div>

        {/* Filter */}
        <div className="border-b border-gray-200 px-6 py-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-500">
            Filter
          </h2>

          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Title</label>
              <input
                className={inputClassName}
                type="text"
                placeholder="Search by title"
                value ={titleQuery}
                onChange={ (e) => setTitleQuery(e.target.value) }
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Description</label>
              <input
                className={inputClassName}
                type="text"
                placeholder="Search by description"
                value={descriptionQuery}
                onChange={ (e) => setDescriptionQuery(e.target.value) }
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Category</label>
              <select
                className={inputClassName}
                value={categoryId ?? ""}
                onChange={(e) =>
                  setCategoryId(e.target.value === "" ? null : Number(e.target.value))
                }
              >
                <option value="">All categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
            </div>

          </div>
        </div>

        {/* Results */}
        <div className="px-6 py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-500">
              Results
            </h2>

            <button className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800">
              NEW PRODUCT
            </button>
          </div>

          <div className="mt-4 overflow-x-auto rounded-2xl border border-gray-200">
            <table id="filter-table" className="min-w-full divide-y divide-gray-200 bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th className={tableHeadingClassName}>
                    <span className="flex items-center gap-1">
                      #
                      <SortIcon className="h-4 w-4 text-gray-400" />
                    </span>
                  </th>
                  <th className={tableHeadingClassName}>Image</th>
                  <th className={tableHeadingClassName}>
                    <span className="flex items-center gap-1">
                      Title
                      <SortIcon className="h-4 w-4 text-gray-400" />
                    </span>
                  </th>
                  <th className={tableHeadingClassName}>
                    <span className="flex items-center gap-1">
                      Description
                      <SortIcon className="h-4 w-4 text-gray-400" />
                    </span>
                  </th>
                  <th className={tableHeadingClassName}>
                    <span className="flex items-center gap-1">
                      Category
                      <SortIcon className="h-4 w-4 text-gray-400" />
                    </span>
                  </th>
                  <th className={tableHeadingClassName}>
                    <span className="flex items-center gap-1">
                      Price
                      <SortIcon className="h-4 w-4 text-gray-400" />
                    </span>
                  </th>
                  <th className={tableHeadingClassName}>
                    <span className="flex items-center gap-1">
                      Disc.%
                      <SortIcon className="h-4 w-4 text-gray-400" />
                    </span>
                  </th>
                  <th className={tableHeadingClassName}>
                    <span className="flex items-center gap-1">
                      Rating
                      <SortIcon className="h-4 w-4 text-gray-400" />
                    </span>
                  </th>
                  <th className={tableHeadingClassName}>
                    <span className="flex items-center gap-1">
                      Stock
                      <SortIcon className="h-4 w-4 text-gray-400" />
                    </span>
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">Modify</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">Delete</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td
                      className="px-3 py-6 text-center text-sm text-gray-500"
                      colSpan={11}
                    >
                      No products found.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product, index) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-3 py-3 font-medium text-gray-900">
                        {index + 1}
                      </td>

                      <td className="px-3 py-3 text-center text-gray-700">
                        <PhotoIcon className="mx-auto h-4 w-4 text-gray-400" />
                      </td>

                      <td className="px-3 py-3">
                        <button className="text-blue-600 hover:underline text-sm font-medium">
                          {product.title}
                        </button>
                      </td>

                      <td className="px-3 py-3 text-sm text-gray-600">
                        {product.description}
                      </td>

                      <td className="px-3 py-3 text-sm text-gray-600">
                        {product.category?.name ?? "No category"}
                      </td>

                      <td className="px-3 py-3 text-gray-700">
                        {product.price.toFixed(2)}
                      </td>

                      <td className="px-3 py-3 text-gray-700">
                        {product.discountPercentage.toFixed(1)}%
                      </td>

                      <td className="px-3 py-3 text-gray-700">
                        {product.rating}
                      </td>

                      <td className="px-3 py-3 text-gray-700">
                        {product.stock}
                      </td>

                      {/* Edit */}
                      <td className="px-3 py-3 text-center">
                        <button
                          onClick={() =>
                            window.confirm(`Save the changes for "${product.title}"?`)
                          }
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                      </td>

                      {/* Delete */}
                      <td className="px-3 py-3 text-center">
                        <button
                          onClick={() =>
                            setProductToDelete(product)
                          }
                          className="text-red-600 hover:text-red-800"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <DeleteConfirmModal
        product={productToDelete}
        onClose={() => setProductToDelete(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default ProductPage;
