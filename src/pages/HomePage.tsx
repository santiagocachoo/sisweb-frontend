import { Link } from "react-router-dom";

interface Props {}

const HomePage: React.FC<Props> = () => {
  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="px-6 py-10 sm:px-8 sm:py-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
            Dashboard
          </p>

          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-gray-900">
            Manage your products
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-600">
            Review the catalog, filter products, and keep the store organized
            from a single place.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/product"
              className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              View products
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Catalog</p>
          <p className="mt-2 text-2xl font-semibold text-gray-900">1</p>
          <p className="mt-2 text-sm text-gray-600">
            Products currently available in the system.
          </p>
        </article>

        <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Total value</p>
          <p className="mt-2 text-2xl font-semibold text-gray-900">$1,000,000,000</p>
          <p className="mt-2 text-sm text-gray-600">
            Total value in current stock
          </p>
        </article>

        <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Low stock</p>
          <p className="mt-2 text-2xl font-semibold text-gray-900">14</p>
          <p className="mt-2 text-sm text-gray-600">
            Products that may require attention soon.
          </p>
        </article>
      </section>
    </div>
  );
};

export default HomePage;