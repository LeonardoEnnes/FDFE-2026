import { useAppStore } from '../store/useAppStore';
import { Navigate } from 'react-router-dom';

export default function Login() {
  const login = useAppStore((state) => state.login);
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);

  if (isAuthenticated) return <Navigate to="/" replace />;

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-sm rounded-lg border border-slate-800 bg-slate-950 p-8 shadow-xl">
        <h2 className="mb-6 text-center text-3xl font-extrabold text-emerald-400">
          CryptoTracker
        </h2>
        <p className="mb-6 text-center text-sm text-slate-400">
          Acesse o painel em tempo real 
        </p>
        <button 
          onClick={() => login('Leonardo')} 
          className="w-full rounded-lg bg-emerald-500 py-3 text-sm font-bold text-slate-950 transition-all hover:bg-emerald-400 active:scale-[0.98]"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}