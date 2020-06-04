<template>
  <div class="component-container">
    <!-- Search Bar -->
    <search-bar />

    <!-- weather forecast from current upto 7 days  -->
    <weather-forecast-from-current-day
      v-if="status === 'success'"
      :dailyData="weatherData && weatherData.daily.slice(0, 7)"
    />
    <!-- The below div will be shown in loading state  -->
    <ContentLoader
      v-else-if="status === 'loading'"
      class="ml-auto mr-auto"
      :width="400"
      :height="50"
      :speed="2"
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
    >
      <rect x="118" y="06" width="170" height="6" rx="3" />
      <rect x="118" y="16" width="170" height="6" rx="3" />
    </ContentLoader>

    <!-- The below code, shows the hourly temprature data -->
    <div class="d-flex justify-content-center">
      <div class="hourly-temperature-container  p-3 mb-5 bg-white w-75">
        <hourly-temperature
          v-if="status === 'success'"
          :hourData="weatherData && weatherData.hourly.slice(0, 24)"
          :currentData="weatherData && weatherData.current"
        />
        <!-- The below div will be shown in loading state -->
        <ContentLoader
          v-else-if="status === 'loading'"
          :width="400"
          :height="150"
          :speed="2"
          primaryColor="#f3f3f3"
          secondaryColor="#ecebeb"
        >
          <rect x="444" y="36" rx="3" ry="3" width="6" height="69" />
          <rect x="86" y="11" rx="3" ry="3" width="7" height="135" />
          <rect x="88" y="9" rx="3" ry="3" width="231" height="7" />
          <rect x="87" y="139" rx="3" ry="3" width="230" height="8" />
          <rect x="104" y="27" rx="0" ry="0" width="42" height="19" />
          <rect x="314" y="11" rx="0" ry="0" width="7" height="136" />
          <rect x="103" y="64" rx="0" ry="0" width="202" height="62" />
        </ContentLoader>
      </div>
    </div>

    <pressure-humidity
      v-if="status === 'success'"
      :currentData="weatherData && weatherData.current"
    />
    <content-loader
      v-else-if="status === 'loading'"
      :width="400"
      :height="160"
      :speed="2"
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
    >
      <rect x="200" y="3" rx="0" ry="0" width="49" height="39" />
      <rect x="140" y="4" rx="0" ry="0" width="52" height="39" />
    </content-loader>
  </div>
</template>

<script>
  import SearchBar from "../components/searchBar/searchBar";
  import weatherForecastFromCurrentDay from "../components/weatherForecastFromCurrentDay/weatherForecastFromCurrentDay";
  import hourlyTemperature from "../components/hourlyTemperature/hourlyTemperature";
  import pressureHumidity from "../components/pressureHumidity/pressureHumidity";
  import { ContentLoader } from "vue-content-loader";
  import { mapGetters } from "vuex";

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
      ContentLoader,
    },

    computed: {
      ...mapGetters(["status"]),
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

  .hourly-temperature-container {
    width: 700px;
  }

  @media screen and (max-width: 800px) {
    .hourly-temperature-container {
      width: auto !important;
    }
  }
</style>
