import { createBrowserRouter } from 'react-router';
import { useEffect, useState } from 'react';
import App from '../App';
import { getAllEmpresaMiembros } from '../api/empresaMiembtoAPI';

const HomePage = () => <h1 className='text-2xl font-bold'>Inicio</h1>
const TierPage = () => <h1 className='text-2xl font-bold'>Tiers</h1>

const EmpresaMiembroPage = () => {
  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    getAllEmpresaMiembros().then(setItems).catch(console.error)
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold">Empresas Miembro</h1>
      <p className="mt-2 text-slate-600">Total: {items.length}</p>
    </div>
  )
}
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