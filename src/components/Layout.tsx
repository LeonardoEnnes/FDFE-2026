import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';
import { LayoutDashboard, Compass, Settings as SettingsIcon, LogOut } from 'lucide-react';

export default function Layout() {
  const logout = useAppStore((state) => state.logout);
  const user = useAppStore((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-100">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-950 p-6 flex flex-col justify-between">
        <div className="space-y-8">
          <div className="text-xl font-black text-emerald-400 tracking-wider">
            CRYPTO.LIVE
          </div>
          <nav className="space-y-2">
            <Link to="/" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-900 rounded-lg transition-all">
              <LayoutDashboard size={20} /> Dashboard 
            </Link>
            <Link to="/explorer" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-900 rounded-lg transition-all">
              <Compass size={20} /> Explorar 
            </Link>
            <Link to="/settings" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-900 rounded-lg transition-all">
              <SettingsIcon size={20} /> Configurações 
            </Link>
          </nav>
        </div>

        {/* Perfil & Logout */}
        <div className="border-t border-slate-800 pt-4 flex items-center justify-between">
          <div className="truncate pr-2">
            <p className="text-xs text-slate-500">Usuário</p>
            <p className="text-sm font-semibold text-slate-300 truncate">{user?.username}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-900 transition-all"
            title="Sair"
          >
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      {/* Conteúdo Principal da Rota Ativa */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}