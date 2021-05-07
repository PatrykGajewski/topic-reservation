export const presentDate = (date: string): string | null => {
  if (Number.isNaN(Date.parse(date))) {
    return null;
  }
  return new Date(date).toLocaleDateString('pl-PL');
};
