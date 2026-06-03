import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GameGrid from '../components/GameGrid';
import Marble from '../components/Marble';
import { ACCENT, BG, MARBLE_COLORS, SURFACE, TEXT, TEXT_DIM } from '../constants/theme';
import t from '../constants/i18n';
import { useGameStore } from '../store/gameStore';
import { playSound } from '../utils/sounds';
import { loadInterstitial, showInterstitialIfReady } from '../utils/ads';
import type { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Game'>;

const NEXT_SIZE = 52;

export default function GameScreen({

  useEffect(() => { loadInterstitial(); }, []);

  const previsOver = useRef(false);
  useEffect(() => {
    const cur = useGameStore.getState().isOver;
    if (cur && !previsOver.current) playSound('error');
    previsOver.current = cur;
  }); navigation }: Props) {
  const { grid, score, best, nextMarble, isOver, start, drop } = useGameStore();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{t('title')}</Text>
        <View style={styles.scores}>
          <ScoreBox label={t('score')} value={score} />
          <ScoreBox label={t('best')} value={best} />
        </View>
      </View>

      {/* Next marble preview */}
      <View style={styles.nextRow}>
        <Text style={styles.nextLabel}>{t('next')}</Text>
        <Marble value={nextMarble} size={NEXT_SIZE} />
        <Text style={styles.nextHint}>↓ tap column</Text>
      </View>

      {/* Grid */}
      <View style={styles.gridWrapper}>
        <GameGrid grid={grid} onDrop={drop} isOver={isOver} />
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.btn} onPress={start}>
          <Text style={styles.btnText}>{t('newGame')}</Text>
        </TouchableOpacity>
      </View>

      {/* Game Over Modal */}
      <Modal visible={isOver} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>{t('gameOver')}</Text>
            <Text style={styles.modalScore}>{t('score')}: {score}</Text>
            {score >= best && score > 0 && (
              <Text style={styles.newBest}>{t('highScore')}!</Text>
            )}
            <TouchableOpacity style={styles.modalBtn} onPress={start}>
              <Text style={styles.modalBtnText}>{t('tryAgain')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function ScoreBox({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.scoreBox}>
      <Text style={styles.scoreLabel}>{label}</Text>
      <Text style={styles.scoreValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingTop: 4 },
  back: { color: TEXT, fontSize: 24, paddingRight: 8 },
  title: { fontSize: 22, fontWeight: '900', color: TEXT, flex: 1 },
  scores: { flexDirection: 'row', gap: 8 },
  scoreBox: { backgroundColor: SURFACE, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5, alignItems: 'center' },
  scoreLabel: { color: TEXT_DIM, fontSize: 10, fontWeight: '700' },
  scoreValue: { color: TEXT, fontSize: 16, fontWeight: '800' },
  nextRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 8, gap: 12 },
  nextLabel: { color: TEXT_DIM, fontSize: 14, fontWeight: '700' },
  nextHint: { color: TEXT_DIM, fontSize: 12, flex: 1, textAlign: 'right' },
  gridWrapper: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  controls: { paddingHorizontal: 16, paddingBottom: 8 },
  btn: { backgroundColor: SURFACE, borderRadius: 10, paddingVertical: 12, alignItems: 'center' },
  btnText: { color: TEXT_DIM, fontWeight: '700', fontSize: 14 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', alignItems: 'center', justifyContent: 'center' },
  modal: { backgroundColor: SURFACE, borderRadius: 16, padding: 28, alignItems: 'center', width: 280, gap: 12 },
  modalTitle: { fontSize: 28, fontWeight: '900', color: TEXT },
  modalScore: { fontSize: 16, color: TEXT_DIM },
  newBest: { fontSize: 18, color: '#ffcc00', fontWeight: '700' },
  modalBtn: { backgroundColor: ACCENT, borderRadius: 10, paddingVertical: 12, paddingHorizontal: 32, width: '100%', alignItems: 'center', marginTop: 4 },
  modalBtnText: { color: TEXT, fontWeight: '700', fontSize: 16 },
});
