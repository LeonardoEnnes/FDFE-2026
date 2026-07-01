import { useParams } from 'react-router-dom';

export default function CoinDetail() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white tracking-tight">
        Detalhes: <span className="text-orange-500 capitalize">{id}</span>
      </h1>
      <p className="text-neutral-400 text-sm">Gráfico reativo recebendo dados via WebSocket.</p>
    </div>
  );
}