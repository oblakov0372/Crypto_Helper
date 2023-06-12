export const changeDecimal = (number: number) => {
  return number === 0
    ? number.toFixed(0)
    : number > 1
    ? number.toFixed(2)
    : number.toFixed(5);
};
