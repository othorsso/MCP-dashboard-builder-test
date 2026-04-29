import { create } from 'zustand';
import { AGENT_IDEAS } from '../data/agentIdeasData';
import type { AgentIdea, Category } from '../types/agentIdeas';

interface AgentIdeasStore {
  // Filter state
  searchQuery: string;
  selectedCategories: Category[];
  selectedId: number | null;

  // Actions
  setSearchQuery: (q: string) => void;
  toggleCategory: (cat: Category) => void;
  setCategories: (cats: Category[]) => void;
  clearFilters: () => void;
  selectIdea: (id: number | null) => void;

  // Computed
  filteredIdeas: () => AgentIdea[];
}

export const useAgentIdeasStore = create<AgentIdeasStore>((set, get) => ({
  searchQuery: '',
  selectedCategories: [],
  selectedId: null,

  setSearchQuery: (q) => set({ searchQuery: q }),

  toggleCategory: (cat) =>
    set((s) => ({
      selectedCategories: s.selectedCategories.includes(cat)
        ? s.selectedCategories.filter((c) => c !== cat)
        : [...s.selectedCategories, cat],
    })),

  setCategories: (cats) => set({ selectedCategories: cats }),

  clearFilters: () => set({ searchQuery: '', selectedCategories: [], selectedId: null }),

  selectIdea: (id) => set({ selectedId: id }),

  filteredIdeas: () => {
    const { searchQuery, selectedCategories } = get();
    let ideas = AGENT_IDEAS;

    // Category filter
    if (selectedCategories.length > 0) {
      ideas = ideas.filter((i) => selectedCategories.includes(i.category));
    }

    // Full-text search across key fields
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      ideas = ideas.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.challenge.toLowerCase().includes(q) ||
          i.businessValue.toLowerCase().includes(q) ||
          i.submitter.toLowerCase().includes(q) ||
          i.userRoles.some((r) => r.toLowerCase().includes(q)) ||
          (i.comments?.toLowerCase().includes(q) ?? false)
      );
    }

    return ideas;
  },
}));
