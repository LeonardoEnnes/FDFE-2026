import { useState } from 'react';

export function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      <main className="flex flex-col items-center justify-center flex-grow py-12 gap-8">
        
        <div className="relative flex flex-col items-center">
          <h1 className="text-4xl font-extrabold text-emerald-400 mb-4">
            Crypto Live Tracker
          </h1>
          <p className="text-slate-400">teste</p>
        </div>

        <button
          onClick={() => setCount((c) => c + 1)}
          className="px-6 py-2 bg-emerald-900/30 border border-emerald-500/50 rounded-lg text-emerald-400 hover:border-emerald-400 transition-all"
        >
          Ticks capturados: {count}
        </button>
      </main>

    </div>
  );
}

export default App;