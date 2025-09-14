// utils/magnitudeUtils.js

export function magnitudeToRadius(mag) {
  if (mag === null || mag === undefined || isNaN(mag)) return 4;
  return Math.max(4, Math.pow(mag, 2) * 1.6);
}

export function magnitudeColor(mag) {
  if (mag === null || mag === undefined || isNaN(mag)) return '#999999';
  if (mag >= 6) return '#800026';
  if (mag >= 5) return '#BD0026';
  if (mag >= 4) return '#E31A1C';
  if (mag >= 3) return '#FC4E2A';
  if (mag >= 2) return '#FD8D3C';
  if (mag >= 1) return '#FEB24C';
  return '#FED976';
}
