import { create } from 'zustand';

interface AppState {
    mode: 'light' | 'dark';
    colorTheme: 'blue' | 'purple' | 'pink' | 'orange';
    toggleMode: () => void;
    setColorTheme: (theme: 'blue' | 'purple' | 'pink' | 'orange') => void;
}

export const useStore = create<AppState>((set) => ({
    mode: 'light',
    colorTheme: 'blue',
    toggleMode: () => set((state) => ({ mode: state.mode === 'light' ? 'dark' : 'light' })),
    setColorTheme: (theme) => set({ colorTheme: theme }),
}));
