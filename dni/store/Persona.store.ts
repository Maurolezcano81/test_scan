import { create } from "zustand";

export const usePersonaStore = create((set) => ({
  persona: null,
  setPersona: (p) => set({ persona: p }),
  clearPersona: () => set({ persona: null }),
}));
