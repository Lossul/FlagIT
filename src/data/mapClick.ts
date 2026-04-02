import { getDayIndex, getLocalDateKey } from '@/lib/daily';

export interface MapRegion {
  name: string;
  countries: string[];
}

export interface MapCountryMarker {
  code: string;
  region: string;
  cx: number;
  cy: number;
  r: number;
}

export const mapRegions: MapRegion[] = [
  { name: 'North America', countries: ['ca', 'us', 'mx', 'cu'] },
  { name: 'South America', countries: ['br', 'ar', 'cl', 'pe'] },
  { name: 'Europe', countries: ['gb', 'fr', 'de', 'it'] },
  { name: 'Africa', countries: ['eg', 'ng', 'ke', 'za'] },
  { name: 'Asia-Pacific', countries: ['cn', 'jp', 'in', 'au'] },
];

export const mapCountryMarkers: MapCountryMarker[] = [
  { code: 'ca', region: 'North America', cx: 140, cy: 95, r: 14 },
  { code: 'us', region: 'North America', cx: 200, cy: 160, r: 14 },
  { code: 'mx', region: 'North America', cx: 230, cy: 220, r: 12 },
  { code: 'cu', region: 'North America', cx: 300, cy: 225, r: 10 },

  { code: 'pe', region: 'South America', cx: 300, cy: 330, r: 12 },
  { code: 'br', region: 'South America', cx: 380, cy: 330, r: 14 },
  { code: 'cl', region: 'South America', cx: 300, cy: 390, r: 10 },
  { code: 'ar', region: 'South America', cx: 350, cy: 430, r: 12 },

  { code: 'gb', region: 'Europe', cx: 550, cy: 145, r: 10 },
  { code: 'fr', region: 'Europe', cx: 580, cy: 185, r: 10 },
  { code: 'de', region: 'Europe', cx: 620, cy: 170, r: 10 },
  { code: 'it', region: 'Europe', cx: 610, cy: 215, r: 10 },

  { code: 'eg', region: 'Africa', cx: 650, cy: 255, r: 10 },
  { code: 'ng', region: 'Africa', cx: 560, cy: 305, r: 11 },
  { code: 'ke', region: 'Africa', cx: 670, cy: 310, r: 10 },
  { code: 'za', region: 'Africa', cx: 620, cy: 420, r: 12 },

  { code: 'cn', region: 'Asia-Pacific', cx: 770, cy: 200, r: 14 },
  { code: 'jp', region: 'Asia-Pacific', cx: 880, cy: 205, r: 10 },
  { code: 'in', region: 'Asia-Pacific', cx: 750, cy: 255, r: 12 },
  { code: 'au', region: 'Asia-Pacific', cx: 835, cy: 410, r: 14 },
];

export function getDailyMapClick() {
  const now = new Date();
  const regionIndex = getDayIndex(now, mapRegions.length);
  const region = mapRegions[regionIndex];
  const startIndex = getDayIndex(now, region.countries.length);

  return {
    date: getLocalDateKey(now),
    region,
    startIndex,
  };
}
