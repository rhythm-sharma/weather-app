<template>
  <div class="weather-forcast-container">
    <div class="day-name" style="" aria-label="Tuesday">
      Tue
    </div>
    <div class="weather-icon-container">
      <img
        class="weather-icon-container"
        src="//ssl.gstatic.com/onebox/weather/48/rain_s_cloudy.png"
      />
    </div>
    <div class="temperature">
      <div class="temp-max">
        <span class="temp-text">38</span>
        <span>&#176;</span>
      </div>
      <div class="temp-min">
        <span class="temp-text temp-min-text">27</span>
        <span>&#176;</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "weatherForecastFromCurrentDay",
  };
</script>

<style scoped>
  .weather-forcast-container:hover {
    background-color: #fcfcfc;
    border: 1px solid #e9e9e9;
    border-radius: 1px;
    margin: 0;
  }

  .weather-forcast-container {
    display: inline-block;
    line-height: 1;
    text-align: center;
    transition-duration: 200ms, 200ms, 200ms;
    transition-property: background-image, border, font-weight;
    font-weight: 13px;
    height: 90px;
    width: 73px;
  }

  .day-name {
    padding-top: 7px;
    line-height: 15px;
  }

  .weather-icon-container {
    display: inline-block;
  }

  .weather-icon {
    margin: 1px 4px 0;
    height: 48px;
    width: 48px;
  }

  .temperature {
    font-weight: normal;
    line-height: 15px;
    font-size: 13px;
  }

  .temp-max {
    display: inline-block;
    padding-right: 5px;
  }

  .temp-min {
    display: inline-block;
  }

  .temp-text {
    display: inline;
  }

  .temp-min-text {
    color: #bababa !important;
  }
</style>
