import './App.css'
import {Link, Outlet} from 'react-router'

function App() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white">
        <nav className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-4">
          <Link to="/" className="font-semibold">Inicio</Link>
          <Link to="/tier" className="text-slate-700 hover:text-slate-900">Tiers</Link>
          <Link to="/empresa-miembro" className="text-slate-700 hover:text-slate-900">Empresas Miembro</Link>
        </nav>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-8">
        <Outlet />
      </section>
    </main>
  )
}

export default App
