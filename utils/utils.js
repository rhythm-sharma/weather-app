export const tempratureToDegree = (temp) => {
  const kelvin = 273.15;
  return (temp - kelvin).toFixed(0);
};

export const getWeatherImage = (icon) => {
  return `https://raw.githubusercontent.com/rrhythmsharma/weather-app/32ce4524455c16849244a0ec5a303b802f73be7b/src/assets/weather-icons/${icon}.svg`;
};
