const DEFAULT_EPOCH = new Date(2024, 0, 1);

export function getLocalDateKey(date = new Date()) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export function getDayIndex(date = new Date(), modulo = 1, epoch = DEFAULT_EPOCH) {
  if (modulo <= 0) return 0;
  const localDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const daysSinceEpoch = Math.floor((localDate.getTime() - epoch.getTime()) / (1000 * 60 * 60 * 24));
  const index = ((daysSinceEpoch % modulo) + modulo) % modulo;
  return index;
}
