import { useAppStore } from '@/store/useAppStore';

export default function Settings() {
  const { theme, toggleTheme } = useAppStore();

  return (
    <div className="space-y-6 antialiased">
      <h1 className="text-3xl font-bold text-white tracking-tight">Configurações</h1>
      
      <div className="rounded-lg border border-neutral-900 bg-neutral-950 p-6">
        <h2 className="text-lg font-medium text-neutral-200 mb-4">Preferências do Sistema</h2>
        
        <div className="flex flex-col gap-2">
          <p className="text-sm text-neutral-400">
            Altere o comportamento visual da aplicação. O estado é persistido automaticamente.
          </p>
          <button 
            onClick={toggleTheme}
            className="w-fit mt-2 px-4 py-2 bg-neutral-900 border border-neutral-800 hover:border-orange-500 hover:text-orange-500 rounded text-sm font-medium transition-all uppercase"
          >
            Tema Atual: <span className="font-bold text-orange-500">{theme}</span>
          </button>
        </div>
      </div>
    </div>
  );
}