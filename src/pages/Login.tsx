import { useState, FormEvent } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Navigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const login = useAppStore((state) => state.login);
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);

  if (isAuthenticated) return <Navigate to="/" replace />;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) return;
    
    login(username);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 antialiased">
      <div className="w-full max-w-sm rounded-lg border border-neutral-900 bg-neutral-950 p-8 shadow-2xl">
        
        {/* Logo */}
        <div className="mb-6 flex justify-center items-center gap-2">
          <span className="w-2 h-6 bg-orange-500 rounded-sm"></span>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            CRYPTO<span className="text-neutral-500 font-normal">TRACKER</span>
          </h2>
        </div>
        
        <p className="mb-6 text-center text-sm text-neutral-400">
          Acesse o painel em tempo real 
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
              Nome de Usuário
            </label>
            <input
              id="username"
              type="text"
              required
              placeholder="Digite seu nome"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
            />
          </div>

          <button 
            type="submit"
            className="w-full rounded-lg bg-orange-500 py-3 text-sm font-bold text-black transition-all hover:bg-orange-400 active:scale-[0.98]"
          >
            Entrar no Painel
          </button>
        </form>

      </div>
    </div>
  );
}