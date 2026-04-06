import { Outlet } from 'react-router';
import NavBar from './components/Navbar';

const App:React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="border-b border-gray-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
              Welcome to
            </p>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
              Your Product Store
            </h1>
          </div>
          <NavBar />
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default App;