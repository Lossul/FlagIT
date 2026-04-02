export interface PuzzleGroup {
  level: 1 | 2 | 3 | 4; // 1 = Yellow, 2 = Green, 3 = Blue, 4 = Purple
  theme: string;
  members: [string, string, string, string]; // ISO country codes
}

import { getDayIndex, getLocalDateKey } from '@/lib/daily';

export interface Puzzle {
  id: number;
  date: string; // 'YYYY-MM-DD'
  groups: [PuzzleGroup, PuzzleGroup, PuzzleGroup, PuzzleGroup];
}

export const puzzles: Puzzle[] = [
  {
    id: 1,
    date: '2024-01-01',
    groups: [
      {
        level: 1,
        theme: 'SCANDINAVIAN CROSS',
        members: ['se', 'no', 'dk', 'fi']
      },
      {
        level: 2,
        theme: 'SPANISH-SPEAKING SOUTH AMERICA',
        members: ['co', 'cl', 'pe', 've']
      },
      {
        level: 3,
        theme: 'ISLAND NATIONS',
        members: ['au', 'nz', 'jp', 'ph']
      },
      {
        level: 4,
        theme: 'AFRICAN COUNTRIES',
        members: ['eg', 'ng', 'ke', 'za']
      }
    ]
  },
  {
    id: 2,
    date: '2024-01-02',
    groups: [
      {
        level: 1,
        theme: 'CENTRAL EUROPE',
        members: ['de', 'at', 'ch', 'cz']
      },
      {
        level: 2,
        theme: 'SOUTHEAST ASIA',
        members: ['th', 'vn', 'my', 'id']
      },
      {
        level: 3,
        theme: 'NORTH AMERICA',
        members: ['us', 'ca', 'mx', 'cu']
      },
      {
        level: 4,
        theme: 'MEDITERRANEAN EUROPE',
        members: ['it', 'es', 'gr', 'tr']
      }
    ]
  },
  {
    id: 3,
    date: '2024-01-03',
    groups: [
      {
        level: 1,
        theme: 'TWO-WORD NAMES',
        members: ['sa', 'za', 'nz', 'gb']
      },
      {
        level: 2,
        theme: 'STARTS WITH "C"',
        members: ['ca', 'cn', 'cl', 'co']
      },
      {
        level: 3,
        theme: 'ENDS WITH "LAND"',
        members: ['fi', 'ie', 'pl', 'th']
      },
      {
        level: 4,
        theme: 'ENDS WITH "A"',
        members: ['ar', 'au', 'in', 'id']
      }
    ]
  },
  {
    id: 4,
    date: '2024-01-04',
    groups: [
      {
        level: 1,
        theme: 'ASIA POWERHOUSES',
        members: ['cn', 'jp', 'kr', 'in']
      },
      {
        level: 2,
        theme: 'SOUTH AMERICA',
        members: ['ar', 'br', 'co', 'pe']
      },
      {
        level: 3,
        theme: 'WESTERN EUROPE',
        members: ['fr', 'de', 'es', 'pt']
      },
      {
        level: 4,
        theme: 'AFRICA',
        members: ['eg', 'ng', 'ke', 'ma']
      }
    ]
  },
  {
    id: 5,
    date: '2024-01-05',
    groups: [
      {
        level: 1,
        theme: 'STARTS WITH "S"',
        members: ['se', 'sa', 'za', 'es']
      },
      {
        level: 2,
        theme: 'ENDS WITH "IA"',
        members: ['in', 'ru', 'id', 'au']
      },
      {
        level: 3,
        theme: 'FIVE-LETTER NAMES',
        members: ['eg', 'jp', 'cl', 'cn']
      },
      {
        level: 4,
        theme: 'STARTS WITH "N"',
        members: ['ng', 'nl', 'nz', 'no']
      }
    ]
  }
];

export function getDailyPuzzle(): Puzzle {
  if (puzzles.length === 0) {
    throw new Error('No puzzles available');
  }

  const now = new Date();
  const index = getDayIndex(now, puzzles.length);
  const puzzle = puzzles[index];

  return {
    ...puzzle,
    date: getLocalDateKey(now),
  };
}
