export const changeDecimal = (number: number) => {
  return number > 1
    ? number > 1000
      ? number.toFixed(0)
      : number.toFixed(2)
    : number.toFixed(5);
};
