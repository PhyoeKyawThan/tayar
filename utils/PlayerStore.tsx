import { create } from 'zustand';

type PlayerStore = {
  currentAudioIndex: number | null;
  isPlaying: boolean;
  setCurrentAudioIndex: (index: number | null) => void;
  setIsPlaying: (playing: boolean) => void;
};

export const usePlayerStore = create<PlayerStore>((set) => ({
  currentAudioIndex: null,
  isPlaying: false,
  setCurrentAudioIndex: (index) => set({ currentAudioIndex: index }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
}));
