export const tempratureToDegree = (temp) => {
  const kelvin = 273.15;
  return (temp - kelvin).toFixed(0);
};
