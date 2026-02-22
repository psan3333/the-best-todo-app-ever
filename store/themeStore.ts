import { create } from 'zustand';

// 1. Define the shape of your state
type Theme = 'light' | 'dark';

interface ThemeState {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
}

// 2. Create the store
export const useThemeStore = create<ThemeState>((set) => ({
    theme: 'light', // Default state

    // Actions (what you called reducers)
    toggleTheme: () => set((state) => ({
        theme: state.theme === 'light' ? 'dark' : 'light'
    })),

    setTheme: (theme) => set({ theme }),
}));