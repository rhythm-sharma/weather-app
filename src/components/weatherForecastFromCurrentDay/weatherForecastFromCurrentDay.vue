<template>
  <div class="main-weather-forcast-container">
    <div
      v-for="(item, index) in dailyData"
      :key="index"
      class="weather-forcast-container mx-2"
    >
      <div class="day-name" style="" aria-label="Tuesday">
        Tue
      </div>
      <div class="temperature">
        <div class="temp-max">
          <span class="temp-text">{{ tempratureToDegree(item.temp.max) }}</span>
          <span>&#176;</span>
        </div>
        <div class="temp-min">
          <span class="temp-text text-muted">{{
            tempratureToDegree(item.temp.min)
          }}</span>
          <span>&#176;</span>
        </div>
      </div>
      <div class="weather-icon-container">
        <img
          class="weather-icon"
          :src="getWeatherImage(item.weather[0].icon)"
        />
      </div>
      <span class="weather-type">
        {{ item.weather[0].main }}
      </span>
    </div>
  </div>
</template>

<script>
  import { tempratureToDegree } from "../../../utils/utils";

  export default {
    name: "weatherForecastFromCurrentDay",
    props: {
      dailyData: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        foreCastData: [],
      };
    },
    mounted() {
      this.foreCastData = this.dailyData;
      //   this.foreCastData = this.foreCastData.slice(0, -1);
    },
    methods: {
      tempratureToDegree,
      getWeatherImage(icon) {
        return `http://openweathermap.org/img/wn/${icon}@2x.png`;
      },
    },
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

  .temperature,
  .weather-type {
    font-weight: normal;
    line-height: 15px;
    font-size: 13px;
  }

  .weather-type {
    font-weight: 600;
    color: darkgray;
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
</style>
