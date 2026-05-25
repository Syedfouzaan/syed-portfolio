import { create } from "zustand";

interface AppState {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  selectedProject: number | null;
  setSelectedProject: (id: number | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  mobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  selectedProject: null,
  setSelectedProject: (id) => set({ selectedProject: id }),
}));
