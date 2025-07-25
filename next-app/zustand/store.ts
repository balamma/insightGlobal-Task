import { create } from 'zustand';

type EventFilterState = {
  tagFilter: string | null;
  setTagFilter: (tag: string | null) => void;
};

export const useEventFilterStore = create<EventFilterState>((set) => ({
  tagFilter: null,
  setTagFilter: (tag) => set({ tagFilter: tag }),
}));
