import { create } from 'zustand';
import { dropMarble, newGame } from '../game/logic';
import type { GameState } from '../game/logic';

interface GameStore extends GameState {
  best: number;
  start: () => void;
  drop: (col: number) => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  ...newGame(),
  best: 0,

  start: () => set({ ...newGame() }),

  drop: (col) => {
    const state = get();
    if (state.isOver) return;
    const next = dropMarble(state, col);
    set({
      ...next,
      best: Math.max(get().best, next.score),
    });
  },
}));
