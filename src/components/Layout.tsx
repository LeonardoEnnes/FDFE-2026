import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';
import { LayoutDashboard, Compass, Settings as SettingsIcon, LogOut } from 'lucide-react';

export default function Layout() {
  const logout = useAppStore((state) => state.logout);
  const user = useAppStore((state) => state.user);
  const theme = useAppStore((state) => state.theme);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={`flex min-h-screen antialiased transition-colors duration-200 ${
      theme === 'dark' 
        ? 'bg-black text-slate-200' 
        : 'bg-neutral-50 text-neutral-800'
    }`}>
      
      <aside className={`w-64 border-r p-6 flex flex-col justify-between transition-colors duration-200 ${
        theme === 'dark' 
          ? 'border-neutral-900 bg-neutral-950' 
          : 'border-neutral-200 bg-white'
      }`}>
        <div className="space-y-8">
          <div className={`text-lg font-bold tracking-tight flex items-center gap-2 ${
            theme === 'dark' ? 'text-white' : 'text-neutral-900'
          }`}>
            <span className="w-2 h-5 bg-orange-500 rounded-sm"></span>
            CRYPTO<span className={theme === 'dark' ? 'text-neutral-500 font-normal' : 'text-neutral-400 font-normal'}>TRACKER</span>
          </div>
          
          <nav className="space-y-1">
            <Link 
              to="/" 
              className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? (theme === 'dark' ? 'bg-neutral-900 text-orange-500' : 'bg-neutral-100 text-orange-600') 
                  : (theme === 'dark' ? 'text-neutral-400 hover:bg-neutral-900/50 hover:text-neutral-200' : 'text-neutral-500 hover:bg-neutral-100/50 hover:text-neutral-800')
              }`}
            >
              <LayoutDashboard size={18} /> Dashboard
            </Link>
            <Link 
              to="/explorer" 
              className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                isActive('/explorer') 
                  ? (theme === 'dark' ? 'bg-neutral-900 text-orange-500' : 'bg-neutral-100 text-orange-600') 
                  : (theme === 'dark' ? 'text-neutral-400 hover:bg-neutral-900/50 hover:text-neutral-200' : 'text-neutral-500 hover:bg-neutral-100/50 hover:text-neutral-800')
              }`}
            >
              <Compass size={18} /> Explorar
            </Link>
            <Link 
              to="/settings" 
              className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                isActive('/settings') 
                  ? (theme === 'dark' ? 'bg-neutral-900 text-orange-500' : 'bg-neutral-100 text-orange-600') 
                  : (theme === 'dark' ? 'text-neutral-400 hover:bg-neutral-900/50 hover:text-neutral-200' : 'text-neutral-500 hover:bg-neutral-100/50 hover:text-neutral-800')
              }`}
            >
              <SettingsIcon size={18} /> Configurações
            </Link>
          </nav>
        </div>

        <div className={`border-t pt-4 flex items-center justify-between ${
          theme === 'dark' ? 'border-neutral-900' : 'border-neutral-200'
        }`}>
          <div className="truncate pr-2">
            <p className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold">User</p>
            <p className={`text-sm font-medium truncate ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}`}>{user?.username}</p>
          </div>
          <button 
            onClick={handleLogout}
            className={`p-2 rounded-md transition-colors ${
              theme === 'dark' ? 'text-neutral-500 hover:text-orange-500 hover:bg-neutral-900' : 'text-neutral-400 hover:text-orange-600 hover:bg-neutral-100'
            }`}
            title="Sair do sistema"
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      <main className={`flex-1 p-8 overflow-y-auto transition-colors duration-200 ${
        theme === 'dark' ? 'bg-neutral-950' : 'bg-neutral-50'
      }`}>
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}