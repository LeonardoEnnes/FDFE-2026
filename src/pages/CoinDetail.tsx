import { useParams } from 'react-router-dom';

export default function CoinDetail() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-emerald-400 capitalize">Detalhes: {id} </h1>
      <p className="text-slate-400">Gráfico reativo recebendo dados via WebSocket.</p>
    </div>
  );
}