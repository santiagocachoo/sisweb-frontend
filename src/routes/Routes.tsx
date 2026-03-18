import { createBrowserRouter } from 'react-router';
import App from '../App';

const HomePage = () => <h1 className='text-2xl font-bold'>Inicio</h1>
const TierPage = () => <h1 className='text-2xl font-bold'>Tiers</h1>
const EmpresaMiembroPage = () => <h1 className="text-2xl font-bold">Empresas Miembro</h1>

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
        { index: true, element: <HomePage /> },
        { path: 'tier', element: <TierPage /> },
        { path: 'empresa-miembro', element: <EmpresaMiembroPage /> }
    ],
  },
]);

export default router;