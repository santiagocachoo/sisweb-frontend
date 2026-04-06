import { Link } from "react-router-dom";

const ErrorPage : React.FC = () => {
    return (
        <div className="flex min-h-[60vh] items-center justify-center">
            <section className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white px-6 py-10 text-center shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                    Error
                </p>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900">
                    Page not found
                </h1>
                <p className="mt-4 text-sm leading-6 text-gray-600">
                    The page you are trying to access does not exist or is not available right now.
                </p>
                <div className="mt-6">
                    <Link
                        to="/"
                        className="inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                    >
                        Go back home
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default ErrorPage;
