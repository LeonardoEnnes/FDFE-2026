export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard</h1>
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
        </span>
      </div>
      <p className="text-neutral-400 text-sm">Visão geral do mercado de criptomoedas em tempo real.</p>
      {/* Futuros cards conectados ao WebSocket ficarão aqui */}
    </div>
  );
}