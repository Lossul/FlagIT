import { getDayIndex, getLocalDateKey } from '@/lib/daily';

export interface OddOneOutPuzzle {
  id: number;
  options: [string, string, string, string];
  answer: string;
  reason: string;
}

export const oddOneOutPuzzles: OddOneOutPuzzle[] = [
  {
    id: 1,
    options: ['it', 'es', 'jp', 'pt'],
    answer: 'jp',
    reason: 'Japan is not in Europe.',
  },
  {
    id: 2,
    options: ['ca', 'us', 'mx', 'au'],
    answer: 'au',
    reason: 'Australia is not in North America.',
  },
  {
    id: 3,
    options: ['se', 'no', 'dk', 'at'],
    answer: 'at',
    reason: 'Austria is not a Nordic country.',
  },
  {
    id: 4,
    options: ['eg', 'ke', 'ng', 'cn'],
    answer: 'cn',
    reason: 'China is not in Africa.',
  },
  {
    id: 5,
    options: ['br', 'co', 'pe', 'es'],
    answer: 'es',
    reason: 'Spain is not in South America.',
  },
  {
    id: 6,
    options: ['th', 'vn', 'my', 'ru'],
    answer: 'ru',
    reason: 'Russia is not in Southeast Asia.',
  },
  {
    id: 7,
    options: ['fr', 'de', 'it', 'jp'],
    answer: 'jp',
    reason: 'Japan is not in Europe.',
  },
  {
    id: 8,
    options: ['sa', 'eg', 'ma', 'ca'],
    answer: 'ca',
    reason: 'Canada is not in Africa or the Middle East.',
  },
];

export function getDailyOddOneOut() {
  const now = new Date();
  const index = getDayIndex(now, oddOneOutPuzzles.length);
  return {
    date: getLocalDateKey(now),
    puzzle: oddOneOutPuzzles[index],
  };
}
