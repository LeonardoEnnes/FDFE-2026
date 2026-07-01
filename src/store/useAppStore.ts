import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserSession {
  username: string;
  token: string;
}

interface AppState {
  user: UserSession | null;
  isAuthenticated: boolean;
  login: (username: string) => void;
  logout: () => void;
  
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      theme: 'dark',
      
      login: (username) => set({ 
        user: { username, token: 'mock-jwt-token-123' }, 
        isAuthenticated: true 
      }),
      
      logout: () => set({ 
        user: null, 
        isAuthenticated: false 
      }),
      
      toggleTheme: () => set((state) => ({ 
        theme: state.theme === 'dark' ? 'light' : 'dark' 
      })),
    }),
    {
      name: 'crypto-app-storage',
    }
  )
);