<template>
  <div class="component-container">
    <!-- Shown, in case when endpoint response with error  -->
    <div v-if="status === 'error'">
      <dummy-search-bar />
      <div class="alert alert-danger inline" role="alert">
        <strong>Oh snap!</strong> Something went wrong, Please try again after
        some time
      </div>
    </div>

    <!-- Shown, in case User didn't alowed for location -->
    <div v-if="status === 'TurnOnLocation'">
      <dummy-search-bar />
      <div class="alert alert-warning inline" role="alert">
        Please <strong>Turn on</strong> your location for better experience
      </div>
    </div>

    <!-- Shown, in case when endpoint response is either loading or success -->
    <div v-else>
      <!-- Search Bar -->
      <search-bar v-if="status === 'success'" />

      <!-- weather forecast from current upto 7 days  -->
      <weather-forecast-from-current-day
        v-if="status === 'success'"
        :dailyData="weatherData && weatherData.daily.slice(0, 7)"
        @handleHourlyDataOnSelectedCard="
          (index) => handleHourlyDataOnSelectedCard(index)
        "
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
        <div
          v-if="status === 'success'"
          class="hourly-temperature-container p-3 mb-5 bg-white w-75"
        >
          <hourly-temperature
            :hourData="weatherData && weatherData.hourly.slice(start, end)"
            :fullHourData="weatherData && weatherData.hourly"
            :currentData="weatherData && weatherData.current"
            :start="start"
            :end="end"
            :selectedIndex="selectedIndex"
            :dailyData="weatherData && weatherData.daily.slice(0, 7)"
          />
        </div>
        <!-- The below div will be shown in loading state -->
        <div v-else-if="status === 'loading'" class="w-75 mb-5">
          <ContentLoader
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
        :selectedIndex="selectedIndex"
        :dailyData="weatherData && weatherData.daily.slice(0, 7)"
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
  </div>
</template>

<script>
  import SearchBar from "../components/searchBar/searchBar";
  import DummySearchBar from "../components/dummySearchBar/dummySearchBar";
  import weatherForecastFromCurrentDay from "../components/weatherForecastFromCurrentDay/weatherForecastFromCurrentDay";
  import hourlyTemperature from "../components/hourlyTemperature/hourlyTemperature";
  import pressureHumidity from "../components/pressureHumidity/pressureHumidity";
  import { ContentLoader } from "vue-content-loader";
  import { mapGetters } from "vuex";

  export default {
    name: "ComponentContainer",
    data() {
      return {
        start: 0,
        end: 7,
        selectedIndex: null,
      };
    },
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
      DummySearchBar,
    },

    computed: {
      ...mapGetters(["status"]),
    },
    methods: {
      handleHourlyDataOnSelectedCard(index) {
        this.selectedIndex = index;
        if (index === 0) {
          this.start = 7;
          this.end = 14;
        } else if (index === 1) {
          this.start = 14;
          this.end = 21;
        } else if (index === 2) {
          this.start = 21;
          this.end = 28;
        } else if (index === 3) {
          this.start = 28;
          this.end = 35;
        } else if (index === 4) {
          this.start = 35;
          this.end = 42;
        } else if (index === 5) {
          this.start = 42;
          this.end = 48;
        } else if (index === 6) {
          this.start = 0;
          this.end = 7;
        }
      },
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

  .inline {
    display: inline-block;
  }

  @media screen and (max-width: 800px) {
    .hourly-temperature-container {
      width: auto !important;
    }
  }
</style>
