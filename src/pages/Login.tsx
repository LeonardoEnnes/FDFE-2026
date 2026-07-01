import { useAppStore } from '@/store/useAppStore';
import { Navigate } from 'react-router-dom';

export default function Login() {
  const login = useAppStore((state) => state.login);
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);

  if (isAuthenticated) return <Navigate to="/" replace />;

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 antialiased">
      <div className="w-full max-w-sm rounded-lg border border-neutral-900 bg-neutral-950 p-8 shadow-2xl">
        <div className="mb-6 flex justify-center items-center gap-2">
          <span className="w-2 h-6 bg-orange-500 rounded-sm"></span>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            CRYPTO<span className="text-neutral-500 font-normal">TRACKER</span>
          </h2>
        </div>
        <p className="mb-6 text-center text-sm text-neutral-400">
          Acesse o painel em tempo real 
        </p>
        <button 
          onClick={() => login('Leonardo')} 
          className="w-full rounded-lg bg-orange-500 py-3 text-sm font-bold text-black transition-all hover:bg-orange-400 active:scale-[0.98]"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}