<template>
  <div>
    <h1 class="mb-5">
      Welcome to
      <img class="logo" alt="logo" src="../assets/Richpanel.png" /> Richpanel
      weather app
    </h1>
    <search-bar />
    <weather-forecast-from-current-day
      v-if="weatherData && weatherData.daily"
      :dailyData="weatherData && weatherData.daily.slice(0, 7)"
    />
    <div class="d-flex justify-content-center">
      <div class="p-3 mb-5 bg-white w-75">
        <hourly-temperature
          v-if="weatherData && weatherData.hourly && weatherData.current"
          :hourData="weatherData && weatherData.hourly.slice(0, 24)"
          :currentData="weatherData && weatherData.current"
        />
      </div>
    </div>
    <pressure-humidity
      v-if="weatherData && weatherData.current"
      :currentData="weatherData && weatherData.current"
    />
  </div>
</template>

<script>
  import SearchBar from "../components/searchBar/searchBar";
  import weatherForecastFromCurrentDay from "../components/weatherForecastFromCurrentDay/weatherForecastFromCurrentDay";
  import hourlyTemperature from "../components/hourlyTemperature/hourlyTemperature";
  import pressureHumidity from "../components/pressureHumidity/pressureHumidity";

  export default {
    name: "ComponentContainer",
    props: {
      weatherData: {
        type: Object,
        default: () => {},
      },
    },
    components: {
      SearchBar,
      weatherForecastFromCurrentDay,
      hourlyTemperature,
      pressureHumidity,
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }

  .logo {
    height: 30px;
    width: 30px;
  }

  .box-shadow {
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.175) !important;
  }
</style>
