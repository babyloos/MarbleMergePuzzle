import * as Localization from 'expo-localization';

const locale = Localization.getLocales()[0]?.languageCode ?? 'en';

const strings: Record<string, Record<string, string>> = {
  ja: {
    title: 'マーブルマージ',
    score: 'スコア',
    best: 'ベスト',
    newGame: 'ニューゲーム',
    next: '次',
    gameOver: 'ゲームオーバー',
    tryAgain: 'もう一度',
    howToPlay: '同じ数字のマーブルを隣接させて合体させよう！',
    play: 'プレイ',
    highScore: 'ハイスコア',
  },
  zh: {
    title: '弹珠合并',
    score: '分数',
    best: '最高',
    newGame: '新游戏',
    next: '下一个',
    gameOver: '游戏结束',
    tryAgain: '再试一次',
    howToPlay: '合并相邻的相同数字弹珠！',
    play: '开始',
    highScore: '最高分',
  },
  en: {
    title: 'Marble Merge',
    score: 'SCORE',
    best: 'BEST',
    newGame: 'New Game',
    next: 'Next',
    gameOver: 'Game Over!',
    tryAgain: 'Try Again',
    howToPlay: 'Place marbles to merge identical numbers!',
    play: 'Play',
    highScore: 'High Score',
  },
};

const t = (key: string): string => {
  const lang = locale in strings ? locale : 'en';
  return strings[lang][key] ?? strings['en'][key] ?? key;
};

export default t;
