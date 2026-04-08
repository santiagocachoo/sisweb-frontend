import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { PencilIcon, PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import type { Product } from "my-types";

interface Props {
    product: Product | null;
    onClose: () => void;
    onEdit: () => void;
}

interface FieldProps {
    label: string;
    value: string | number;
}

const Field: React.FC<FieldProps> = ({ label, value }) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-gray-900">
        {value}
      </p>
    </div>
  );
};

const ProductDetailModal: React.FC<Props> = ({ product, onClose, onEdit }) => {
  if (!product) return null;

  return (
    <Dialog open={product !== null} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
            <DialogTitle className="text-2xl font-semibold tracking-tight text-gray-900">
              Product Details
            </DialogTitle>

            <button
              onClick={onClose}
              className="rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
              aria-label="Close product details"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-6 px-6 py-6">
            <div className="flex flex-col gap-5 sm:flex-row">
              <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-gray-50">
                <PhotoIcon className="h-12 w-12 text-gray-400" />
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                      Title
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-gray-900">
                      {product.title}
                    </h2>
                  </div>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    {product.category?.name ?? "No category"}
                  </span>
                </div>

                <div className="mt-5 rounded-2xl border border-gray-200 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
                    Description
                  </p>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Price" value={`$${product.price.toFixed(2)}`} />
              <Field label="Stock" value={product.stock} />
              <Field label="Discount" value={`${product.discountPercentage.toFixed(1)}%`} />
              <Field label="Rating" value={product.rating} />
              <Field label="Product ID" value={product.id} />
              <Field label="Category ID" value={product.categoryId} />
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t border-gray-200 px-6 py-4">
            <button
              onClick={onClose}
              className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Close
            </button>

            <button
              onClick={onEdit}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              <PencilIcon className="h-4 w-4" />
              Edit
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ProductDetailModal;