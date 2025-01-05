export const funcDisturDate = (start: Date, end: Date) => {
  const diff = end?.getTime() - start?.getTime();
  return diff / 1000;
};
