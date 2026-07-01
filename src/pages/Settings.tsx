import { useAppStore } from '@/store/useAppStore';

export default function Settings() {
  const { theme, toggleTheme } = useAppStore();

  return (
    <div className="space-y-6 antialiased">
      <h1 className={`text-3xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
        Configurações
      </h1>
      
      <div className={`rounded-lg border p-6 transition-colors duration-200 ${
        theme === 'dark' ? 'border-neutral-900 bg-neutral-950' : 'border-neutral-200 bg-white'
      }`}>
        <h2 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-neutral-200' : 'text-neutral-800'}`}>
          Preferências do Sistema
        </h2>
        
        <div className="flex flex-col gap-2">
          <p className={theme === 'dark' ? 'text-sm text-neutral-400' : 'text-sm text-neutral-500'}>
            Altere o comportamento visual da aplicação.
          </p>
          <button 
            onClick={toggleTheme}
            className={`w-fit mt-2 px-4 py-2 border rounded text-sm font-medium transition-all uppercase ${
              theme === 'dark' 
                ? 'bg-neutral-900 border-neutral-800 hover:border-orange-500 text-white' 
                : 'bg-neutral-100 border-neutral-200 hover:border-orange-600 text-neutral-900'
            }`}
          >
            Tema Atual: <span className={theme === 'dark' ? 'font-bold text-orange-500' : 'font-bold text-orange-600'}>{theme}</span>
          </button>
        </div>
      </div>
    </div>
  );
}