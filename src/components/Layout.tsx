import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';
import { LayoutDashboard, Compass, Settings as SettingsIcon, LogOut } from 'lucide-react';

export default function Layout() {
  const logout = useAppStore((state) => state.logout);
  const user = useAppStore((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Função auxiliar para marcar o link ativo de forma sutil
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex min-h-screen bg-black text-slate-200 antialiased selection:bg-orange-500 selection:text-black">
      
      {/* Sidebar - Fundo cinza quase preto, borda fina separadora */}
      <aside className="w-64 border-r border-neutral-900 bg-neutral-950 p-6 flex flex-col justify-between">
        <div className="space-y-8">
          {/* Logo Minimalista */}
          <div className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
            <span className="w-2 h-5 bg-orange-500 rounded-sm"></span>
            CRYPTO<span className="text-neutral-500 font-normal">TRACKER</span>
          </div>
          
          {/* Navegação Sóbria */}
          <nav className="space-y-1">
            <Link 
              to="/" 
              className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'bg-neutral-900 text-orange-500' 
                  : 'text-neutral-400 hover:bg-neutral-900/50 hover:text-neutral-200'
              }`}
            >
              <LayoutDashboard size={18} /> Dashboard
            </Link>
            <Link 
              to="/explorer" 
              className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                isActive('/explorer') 
                  ? 'bg-neutral-900 text-orange-500' 
                  : 'text-neutral-400 hover:bg-neutral-900/50 hover:text-neutral-200'
              }`}
            >
              <Compass size={18} /> Explorar
            </Link>
            <Link 
              to="/settings" 
              className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                isActive('/settings') 
                  ? 'bg-neutral-900 text-orange-500' 
                  : 'text-neutral-400 hover:bg-neutral-900/50 hover:text-neutral-200'
              }`}
            >
              <SettingsIcon size={18} /> Configurações
            </Link>
          </nav>
        </div>

        {/* Perfil Inferior Limpo */}
        <div className="border-t border-neutral-900 pt-4 flex items-center justify-between">
          <div className="truncate pr-2">
            <p className="text-[11px] uppercase tracking-wider text-neutral-600 font-semibold">User</p>
            <p className="text-sm font-medium text-neutral-300 truncate">{user?.username}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="p-2 text-neutral-500 hover:text-orange-500 rounded-md hover:bg-neutral-900 transition-colors"
            title="Sair do sistema"
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* Área de Conteúdo */}
      <main className="flex-1 bg-neutral-950 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}