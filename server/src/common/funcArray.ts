export const funcDisturbance = <T>(array: T[]) => {
  const length = array.length;
  if (length < 2) {
    return array;
  }

  for (let i = length - 1; i >= 0; i--) {
    const random = Math.floor(Math.random() * i);
    const value = array[random];
    array[random] = array[i];
    array[i] = value;
  }

  return array;
};
