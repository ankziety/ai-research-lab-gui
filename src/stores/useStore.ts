import { create } from 'zustand';
import type { Experiment, AppSettings, ChatMessage } from '../types';

interface AppStore {
  // Experiments
  experiments: Experiment[];
  activeExperiment: string | null;
  addExperiment: (experiment: Experiment) => void;
  updateExperiment: (id: string, updates: Partial<Experiment>) => void;
  deleteExperiment: (id: string) => void;
  setActiveExperiment: (id: string | null) => void;

  // Chat
  messages: ChatMessage[];
  addMessage: (message: ChatMessage) => void;
  clearMessages: () => void;

  // Settings
  settings: AppSettings;
  updateSettings: (updates: Partial<AppSettings>) => void;

  // UI State
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const defaultSettings: AppSettings = {
  theme: 'light',
  notifications: true,
  autoSave: true,
  maxConcurrentExperiments: 5,
  apiConfig: {},
};

export const useStore = create<AppStore>()((set) => ({
  // Experiments
  experiments: [],
  activeExperiment: null,
  addExperiment: (experiment) =>
    set((state) => ({
      experiments: [...state.experiments, experiment],
    })),
  updateExperiment: (id, updates) =>
    set((state) => ({
      experiments: state.experiments.map((exp) =>
        exp.id === id ? { ...exp, ...updates } : exp
      ),
    })),
  deleteExperiment: (id) =>
    set((state) => ({
      experiments: state.experiments.filter((exp) => exp.id !== id),
      activeExperiment: state.activeExperiment === id ? null : state.activeExperiment,
    })),
  setActiveExperiment: (id) => set({ activeExperiment: id }),

  // Chat
  messages: [],
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  clearMessages: () => set({ messages: [] }),

  // Settings
  settings: defaultSettings,
  updateSettings: (updates) =>
    set((state) => ({
      settings: { ...state.settings, ...updates },
    })),

  // UI State
  sidebarOpen: true,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  currentPage: 'home',
  setCurrentPage: (page) => set({ currentPage: page }),
}));