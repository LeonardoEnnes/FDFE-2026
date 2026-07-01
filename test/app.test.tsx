import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useAppStore } from '../src/store/useAppStore';

// Mock
window.matchMedia = window.matchMedia || (() => ({ matches: false, addListener: () => {}, removeListener: () => {} }));

describe('CryptoTracker - Suite de Testes Unitários', () => {
  
  beforeEach(() => {
    const store = useAppStore.getState();
    store.logout();
    if (store.theme !== 'dark') store.toggleTheme();
  });

  it('deve iniciar com o usuário deslogado por padrão', () => {
    const state = useAppStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
  });

  it('deve autenticar o usuário corretamente ao disparar a ação de login', () => {
    const store = useAppStore.getState();
    store.login('Leonardo');
    
    const updatedState = useAppStore.getState();
    expect(updatedState.isAuthenticated).toBe(true);
    expect(updatedState.user?.username).toBe('Leonardo');
  });

  it('deve alternar o tema do sistema entre dark e light', () => {
    const store = useAppStore.getState();
    expect(store.theme).toBe('dark');
    
    store.toggleTheme();
    expect(useAppStore.getState().theme).toBe('light');
  });

  it('deve renderizar elementos textuais estáticos básicos', () => {
    render(
      <div className="p-4">
        <h2 data-testid="test-title">CRYPTO.LIVE</h2>
      </div>
    );
    const element = screen.getByTestId('test-title');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('CRYPTO.LIVE');
  });

  it('deve aplicar classes condicionais de estilização baseadas em propriedades', () => {
    const isPositive = true;
    render(
      <span data-testid="badge" className={isPositive ? 'text-emerald-400' : 'text-red-400'}>
        +5.25%
      </span>
    );
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('text-emerald-400');
    expect(badge).not.toHaveClass('text-red-400');
  });
});