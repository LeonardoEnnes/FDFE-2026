import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';

import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import Explorer from '@/pages/Explorer';
import CoinDetail from '@/pages/CoinDetail';
import Settings from '@/pages/Settings';

import Layout from '@/components/Layout';

// Guard de Rotas Protegidas
const ProtectedRoutes = () => {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota Pública */}
        <Route path="/login" element={<Login />} />

        {/* Rotas Protegidas envelopadas no Layout Base */}
        <Route element={<ProtectedRoutes />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/explorer" element={<Explorer />} />
            <Route path="/coin/:id" element={<CoinDetail />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>

        {/* Fallback*/}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;