import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { MARBLE_COLORS, EMPTY_CELL, CELL_BORDER } from '../constants/theme';

interface MarbleProps {
  value: number | null;
  size: number;
}

export default function Marble({ value, size }: MarbleProps) {
  const scale = useRef(new Animated.Value(value ? 0 : 1)).current;
  const prevValue = useRef(value);

  useEffect(() => {
    if (value && value !== prevValue.current) {
      scale.setValue(0.1);
      Animated.spring(scale, {
        toValue: 1,
        friction: 5,
        tension: 300,
        useNativeDriver: true,
      }).start();
    }
    prevValue.current = value;
  }, [value]);

  const colors = value ? (MARBLE_COLORS[value] ?? { bg: '#7c3aed', text: '#fff', glow: '#7c3aed' }) : null;

  const fontSize =
    value && value >= 1000 ? size * 0.26
    : value && value >= 100 ? size * 0.32
    : size * 0.38;

  return (
    <Animated.View
      style={[
        styles.cell,
        {
          width: size,
          height: size,
          backgroundColor: colors ? colors.bg : EMPTY_CELL,
          borderColor: colors ? colors.glow : CELL_BORDER,
          borderRadius: size / 2,
          transform: [{ scale }],
        },
      ]}
    >
      {value ? (
        <Text style={[styles.text, { color: colors!.text, fontSize }]}>{value}</Text>
      ) : null}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cell: {
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '900',
  },
});
