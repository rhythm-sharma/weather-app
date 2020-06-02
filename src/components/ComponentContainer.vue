<template>
  <div>
    <h1 class="mb-5">
      Welcome to
      <img class="logo" alt="logo" src="../assets/Richpanel.png" /> Richpanel
      weather app
    </h1>
    <search-bar />
    <weather-forecast-from-current-day />
    <div class="d-flex justify-content-center">
      <div class="p-3 mb-5 bg-white w-75">
        <hourly-temperature />
      </div>
    </div>
    <pressureHumidity />
  </div>
</template>

<script>
  import SearchBar from "../components/searchBar/searchBar";
  import weatherForecastFromCurrentDay from "../components/weatherForecastFromCurrentDay/weatherForecastFromCurrentDay";
  import hourlyTemperature from "../components/hourlyTemperature/hourlyTemperature";
  import pressureHumidity from "../components/pressureHumidity/pressureHumidity";
  import { getGeoLocation } from "../../utils/geoLocation";

  export default {
    name: "ComponentContainer",
    props: {
      msg: String,
    },
    components: {
      SearchBar,
      weatherForecastFromCurrentDay,
      hourlyTemperature,
      pressureHumidity,
    },
    methods: {
      getGeoLocation,
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
