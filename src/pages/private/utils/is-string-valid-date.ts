export const isStringValidDate = (date: string): boolean => (
  !Number.isNaN(new Date(date).getTime())
);
