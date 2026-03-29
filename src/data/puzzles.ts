export interface PuzzleGroup {
  level: 1 | 2 | 3 | 4; // 1 = Yellow, 2 = Green, 3 = Blue, 4 = Purple
  theme: string;
  members: [string, string, string, string]; // ISO country codes
}

export interface Puzzle {
  id: number;
  date: string; // 'YYYY-MM-DD'
  groups: [PuzzleGroup, PuzzleGroup, PuzzleGroup, PuzzleGroup];
}

function formatLocalDate(date: Date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
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
  }
];

export function getDailyPuzzle(): Puzzle {
  if (puzzles.length === 0) {
    throw new Error('No puzzles available');
  }

  const now = new Date();
  const localDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const epoch = new Date(2024, 0, 1);
  const daysSinceEpoch = Math.floor((localDate.getTime() - epoch.getTime()) / (1000 * 60 * 60 * 24));
  const index = ((daysSinceEpoch % puzzles.length) + puzzles.length) % puzzles.length;
  const puzzle = puzzles[index];

  return {
    ...puzzle,
    date: formatLocalDate(localDate),
  };
}
