import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ProductPage from '../pages/ProductPage';
import ErrorPage from '../pages/ErrorPage';
import HomePage from '../pages/HomePage';
import NewProductPage from '../pages/NewProductPage';
import DashboardPage from '../pages/DashboardPage';
import ProductFormPage from '../pages/ProductFormPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'product', element: <ProductPage /> },
            { path: 'product/new', element: <NewProductPage /> },
            { path: 'product/:id/edit', element: <ProductFormPage />},
            { path: 'dashboard',         element: <DashboardPage />},
        ]
    },
    /*{

        path: "/auth",
        element: <AuthLayout />,
        children: [
            { path: "login", element: <LoginPage /> },
            { path: "register", element: <RegisterPage /> },
        ]
    },*/
]);

export default router;
