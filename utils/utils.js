export const tempratureToDegree = (temp) => {
  const kelvin = 273.15;
  return (temp - kelvin).toFixed(0);
};

export const getWeatherImage = (icon) => {
  return `http://openweathermap.org/img/wn/${icon}@2x.png`;
};
