export const getRatingColor = (rating: number): string => {
  if (rating < 5) return '#c82020';
  if (rating < 7) return '#777';
  if (rating < 8) return '#308e21';
  return '#a59400';
};