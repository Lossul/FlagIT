import { getDayIndex, getLocalDateKey } from '@/lib/daily';

export interface BorderBuilderRegion {
  name: string;
  countries: string[];
  neighbors: Record<string, string[]>;
}

export const borderBuilderRegions: BorderBuilderRegion[] = [
  {
    name: 'North America',
    countries: ['ca', 'us', 'mx'],
    neighbors: {
      ca: ['us'],
      us: ['ca', 'mx'],
      mx: ['us'],
    },
  },
  {
    name: 'South America',
    countries: ['ar', 'br', 'cl', 'pe', 'co', 've'],
    neighbors: {
      ar: ['br', 'cl'],
      br: ['ar', 'co', 'pe', 've'],
      cl: ['ar', 'pe'],
      pe: ['br', 'cl', 'co'],
      co: ['br', 'pe', 've'],
      ve: ['br', 'co'],
    },
  },
  {
    name: 'Western & Central Europe',
    countries: ['fr', 'de', 'es', 'pt', 'it', 'ch', 'at', 'nl', 'be', 'pl', 'cz', 'dk'],
    neighbors: {
      fr: ['es', 'de', 'it', 'ch', 'be'],
      de: ['fr', 'nl', 'be', 'ch', 'at', 'pl', 'cz', 'dk'],
      es: ['fr', 'pt'],
      pt: ['es'],
      it: ['fr', 'ch', 'at'],
      ch: ['fr', 'de', 'it', 'at'],
      at: ['de', 'ch', 'it', 'cz'],
      nl: ['de', 'be'],
      be: ['nl', 'de', 'fr'],
      pl: ['de', 'cz'],
      cz: ['de', 'at', 'pl'],
      dk: ['de'],
    },
  },
  {
    name: 'Asia Mainland',
    countries: ['cn', 'in', 'vn', 'th', 'my', 'ru'],
    neighbors: {
      cn: ['in', 'vn', 'ru'],
      in: ['cn'],
      vn: ['cn', 'th'],
      th: ['vn', 'my'],
      my: ['th'],
      ru: ['cn'],
    },
  },
];

function getEligibleStarts(region: BorderBuilderRegion) {
  return region.countries.filter((code) => (region.neighbors[code] || []).length > 0);
}

export function getDailyBorderBuilder() {
  const today = new Date();
  const regionIndex = getDayIndex(today, borderBuilderRegions.length);
  const region = borderBuilderRegions[regionIndex];
  const eligible = getEligibleStarts(region);
  const startIndex = getDayIndex(today, eligible.length);
  const startCountry = eligible[startIndex] ?? region.countries[0];

  return {
    date: getLocalDateKey(today),
    region,
    startCountry,
  };
}
