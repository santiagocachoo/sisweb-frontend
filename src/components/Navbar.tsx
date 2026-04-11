import { NavLink } from "react-router"

const NavBar:React.FC = () => {
    return (<nav
        className="flex flex-wrap items-center gap-1 sm:gap-2"
        aria-label="Principal"
      >
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive
              ? "rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white"
              : "rounded-full px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          }
        >
          Inicio
        </NavLink>
        <NavLink
          to="/product"
          className={({ isActive }) =>
            isActive
              ? "rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white"
              : "rounded-full px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          }
        >
          Productos
        </NavLink>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white"
              : "rounded-full px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          }
        >
          Dashboard
        </NavLink>
      </nav>)
}

export default NavBar
