import { create } from "zustand";
import { TripMedia } from "@/types/trips";

interface LightboxState {
  isOpen: boolean;
  items: TripMedia[];
  currentIndex: number;
  open: (items: TripMedia[], index: number) => void;
  close: () => void;
  next: () => void;
  prev: () => void;
}

export const useLightbox = create<LightboxState>((set, get) => ({
  isOpen: false,
  items: [],
  currentIndex: 0,
  open: (items, index) => set({ isOpen: true, items, currentIndex: index }),
  close: () => set({ isOpen: false }),
  next: () => {
    const { items, currentIndex } = get();
    set({ currentIndex: (currentIndex + 1) % items.length });
  },
  prev: () => {
    const { items, currentIndex } = get();
    set({ currentIndex: (currentIndex - 1 + items.length) % items.length });
  },
}));

interface FilterState {
  activeTag: string | null;
  searchQuery: string;
  setActiveTag: (tag: string | null) => void;
  setSearchQuery: (q: string) => void;
}

export const useFilters = create<FilterState>((set) => ({
  activeTag: null,
  searchQuery: "",
  setActiveTag: (tag) => set({ activeTag: tag }),
  setSearchQuery: (q) => set({ searchQuery: q }),
}));
