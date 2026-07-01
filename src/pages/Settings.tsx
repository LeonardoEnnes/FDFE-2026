import { useAppStore } from '@/store/useAppStore';

export default function Settings() {
  const { theme, toggleTheme } = useAppStore();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-100">Configurações </h1>
      <div className="rounded-lg border border-slate-800 bg-slate-950 p-6">
        <h2 className="text-lg font-medium text-slate-200 mb-4">Preferências do Sistema </h2>
        <button 
          onClick={toggleTheme}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded text-sm transition-all"
        >
          Tema Atual: <span className="font-bold text-emerald-400 uppercase">{theme}</span> 
        </button>
      </div>
    </div>
  );
}