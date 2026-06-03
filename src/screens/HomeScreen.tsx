import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ACCENT, BG, TEXT, TEXT_DIM, MARBLE_COLORS } from '../constants/theme';
import t from '../constants/i18n';
import type { RootStackParamList } from '../../App';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { BANNER_AD_UNIT_ID } from '../utils/ads';
import { useEffect } from 'react';
import { initSounds } from '../utils/sounds';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  useEffect(() => { initSounds(); }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>{t('title')}</Text>
        <Text style={styles.subtitle}>{t('howToPlay')}</Text>

        <View style={styles.preview}>
          {[1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048].map((v) => {
            const c = MARBLE_COLORS[v] ?? { bg: '#7c3aed', text: '#fff' };
            return (
              <View key={v} style={[styles.previewMarble, { backgroundColor: c.bg }]}>
                <Text style={[styles.previewText, { color: c.text, fontSize: v >= 1000 ? 8 : v >= 100 ? 10 : 12 }]}>
                  {v}
                </Text>
              </View>
            );
          })}
        </View>

        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Game')}>
          <Text style={styles.btnText}>{t('play')}</Text>
        </TouchableOpacity>
      </View>
      <BannerAd unitId={BANNER_AD_UNIT_ID} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG },
  inner: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24, gap: 24 },
  title: { fontSize: 40, fontWeight: '900', color: TEXT, letterSpacing: -1 },
  subtitle: { fontSize: 15, color: TEXT_DIM, textAlign: 'center', paddingHorizontal: 8 },
  preview: { flexDirection: 'row', flexWrap: 'wrap', width: 240, gap: 8, justifyContent: 'center' },
  previewMarble: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewText: { fontWeight: '800' },
  btn: {
    backgroundColor: ACCENT,
    paddingVertical: 16,
    paddingHorizontal: 56,
    borderRadius: 12,
    marginTop: 8,
  },
  btnText: { color: TEXT, fontSize: 20, fontWeight: '700' },
});
