import { StyleSheet, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { GRID_BG } from '../constants/theme';
import { COLS, ROWS, type Grid, canDrop } from '../game/logic';
import Marble from './Marble';

interface GameGridProps {
  grid: Grid;
  onDrop: (col: number) => void;
  isOver: boolean;
}

const GAP = 4;
const PADDING = 8;

export default function GameGrid({ grid, onDrop, isOver }: GameGridProps) {
  const { width } = useWindowDimensions();
  const gridWidth = Math.min(width - 24, 380);
  const cellSize = (gridWidth - PADDING * 2 - GAP * (COLS - 1)) / COLS;

  return (
    <View style={[styles.grid, { width: gridWidth, padding: PADDING, gap: GAP }]}>
      {Array.from({ length: ROWS }, (_, r) => (
        <View key={r} style={[styles.row, { gap: GAP }]}>
          {Array.from({ length: COLS }, (_, c) => (
            <TouchableOpacity
              key={c}
              onPress={() => !isOver && canDrop(grid, c) && onDrop(c)}
              activeOpacity={0.7}
            >
              <Marble value={grid[r][c]} size={cellSize} />
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    backgroundColor: GRID_BG,
    borderRadius: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
