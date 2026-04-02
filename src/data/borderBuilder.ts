import { getDayIndex, getLocalDateKey } from '@/lib/daily';

export interface BorderBuilderRegion {
  name: string;
  countries: string[];
  neighbors: Record<string, string[]>;
}

export const borderBuilderRegions: BorderBuilderRegion[] = [
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
];

export function getDailyBorderBuilder() {
  const today = new Date();
  const regionIndex = getDayIndex(today, borderBuilderRegions.length);
  const region = borderBuilderRegions[regionIndex];
  const startIndex = getDayIndex(today, region.countries.length);
  const startCountry = region.countries[startIndex];

  return {
    date: getLocalDateKey(today),
    region,
    startCountry,
  };
}
