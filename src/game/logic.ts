export const COLS = 6;
export const ROWS = 9;

export type CellValue = number | null;
export type Grid = CellValue[][];

export interface GameState {
  grid: Grid;
  score: number;
  nextMarble: number;
  isOver: boolean;
}

export function emptyGrid(): Grid {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(null));
}

export function randomMarble(): number {
  // Weighted random: smaller values more likely
  const r = Math.random();
  if (r < 0.45) return 1;
  if (r < 0.75) return 2;
  if (r < 0.90) return 4;
  return 8;
}

export function newGame(): GameState {
  return {
    grid: emptyGrid(),
    score: 0,
    nextMarble: randomMarble(),
    isOver: false,
  };
}

// Drop a marble into a column - falls to the lowest empty row
export function dropMarble(state: GameState, col: number): GameState {
  if (!canDrop(state.grid, col)) return state;

  let grid = state.grid.map(r => [...r]);

  // Find the lowest empty row in this column
  let targetRow = -1;
  for (let r = ROWS - 1; r >= 0; r--) {
    if (grid[r][col] === null) {
      targetRow = r;
      break;
    }
  }
  if (targetRow === -1) return state;

  grid[targetRow][col] = state.nextMarble;

  // Merge loop: find adjacent pairs of same value and merge them
  let merged = true;
  let score = state.score;
  while (merged) {
    merged = false;
    outer:
    for (let r = ROWS - 1; r >= 0; r--) {
      for (let c = 0; c < COLS; c++) {
        const val = grid[r][c];
        if (!val) continue;
        // Check neighbors
        for (const [dr, dc] of [[0,1],[1,0],[0,-1],[-1,0]]) {
          const nr = r + dr, nc = c + dc;
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && grid[nr][nc] === val) {
            const newVal = val * 2;
            grid[r][c] = newVal;
            grid[nr][nc] = null;
            score += newVal;
            merged = true;
            break outer;
          }
        }
      }
    }
    if (merged) {
      // Apply gravity after each merge
      grid = applyGravity(grid);
    }
  }

  const nextMarble = randomMarble();
  const isOver = !Array.from({ length: COLS }, (_, c) => c).some(c => canDrop(grid, c));

  return { grid, score, nextMarble, isOver };
}

function applyGravity(grid: Grid): Grid {
  const next = emptyGrid();
  for (let c = 0; c < COLS; c++) {
    let writeRow = ROWS - 1;
    for (let r = ROWS - 1; r >= 0; r--) {
      if (grid[r][c] !== null) {
        next[writeRow][c] = grid[r][c];
        writeRow--;
      }
    }
  }
  return next;
}

export function canDrop(grid: Grid, col: number): boolean {
  return col >= 0 && col < COLS && grid[0][col] === null;
}
