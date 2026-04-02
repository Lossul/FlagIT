import { getDayIndex, getLocalDateKey } from '@/lib/daily';

export interface CluePuzzle {
  id: number;
  answer: string;
  clues: [string, string, string];
}

export const cluePuzzles: CluePuzzle[] = [
  {
    id: 1,
    answer: 'eg',
    clues: [
      'Home to the Nile River.',
      'Capital city is Cairo.',
      'The Pyramids of Giza are here.',
    ],
  },
  {
    id: 2,
    answer: 'jp',
    clues: [
      'An island nation in East Asia.',
      'Capital city is Tokyo.',
      'Often called the Land of the Rising Sun.',
    ],
  },
  {
    id: 3,
    answer: 'au',
    clues: [
      'The only country that is also a continent.',
      'Capital city is Canberra.',
      'Home to the Great Barrier Reef.',
    ],
  },
  {
    id: 4,
    answer: 'ca',
    clues: [
      'Borders the United States to the south.',
      'Capital city is Ottawa.',
      'National symbol is the maple leaf.',
    ],
  },
  {
    id: 5,
    answer: 'br',
    clues: [
      'Largest country in South America.',
      'Home to much of the Amazon rainforest.',
      'Capital city is Brasília.',
    ],
  },
  {
    id: 6,
    answer: 'in',
    clues: [
      'The Taj Mahal is located here.',
      'Capital city is New Delhi.',
      'The Himalayas lie along the northern border.',
    ],
  },
  {
    id: 7,
    answer: 'fr',
    clues: [
      'The Eiffel Tower stands in its capital.',
      'Capital city is Paris.',
      'Often called “The Hexagon.”',
    ],
  },
  {
    id: 8,
    answer: 'mx',
    clues: [
      'Capital city is Mexico City.',
      'Home to ancient Maya and Aztec civilizations.',
      'North American country south of the United States.',
    ],
  },
];

export function getDailyCluePuzzle() {
  const now = new Date();
  const index = getDayIndex(now, cluePuzzles.length);
  return {
    date: getLocalDateKey(now),
    puzzle: cluePuzzles[index],
  };
}
