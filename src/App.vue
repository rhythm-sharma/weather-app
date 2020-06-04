<template>
  <div id="app">
    <ComponentContainer :weatherData="weatherData" />
  </div>
</template>

<script>
  import ComponentContainer from "./components/ComponentContainer.vue";
  import cityData from "../utils/data.json";
  import { mapActions, mapGetters } from "vuex";

  export default {
    name: "App",
    components: {
      ComponentContainer,
    },

    data() {
      return {
        baseUrl: "https://api.openweathermap.org/data/2.5/onecall?",
        lat: "",
        lon: "",
      };
    },

    computed: {
      ...mapGetters(["status", "weatherData", "appId"]),
    },

    mounted() {
      localStorage.setItem("cityData", JSON.stringify(cityData));
      this.getGeoLocation();
    },

    methods: {
      ...mapActions(["handleStatus", "handleWeatherData", "handleCityName"]),
      getGeoLocation() {
        this.handleStatus("loading");
        const that = this;
        if ("geolocation" in navigator) {
          // check if geolocation is supported/enabled on current browser
          navigator.geolocation.getCurrentPosition(
            function success(position) {
              that.ipLookUp(position);
              // for when getting location is a success
              console.log("position.coords", position.coords);
            },
            function error(error_message) {
              // for when getting location results in an error
              console.error(
                "An error has occured while retrieving" + "location",
                error_message
              );
              // that.ipLookUp();
              that.handleStatus("TurnOnLocation");
            }
          );
        } else {
          // geolocation is not supported
          // get your location some other way
          console.log("geolocation is not enabled on this browser");
          // this.ipLookUp();
        }
      },
      async ipLookUp(position) {
        let geoLocResponse;
        let weatherResponse;

        // get Geo-Location using IP
        try {
          geoLocResponse = await this.$http.get(
            "https://demo.ip-api.com/json/"
          );
          console.log("geoLocResponse", geoLocResponse);
          this.handleCityName(geoLocResponse.data.city);
        } catch (error) {
          console.log("Request failed.  Returned status of", error);
          this.handleStatus("error");
        }

        // get the weather response
        try {
          if (geoLocResponse) {
            weatherResponse = await this.$http.get(
              `${this.baseUrl}lat=${geoLocResponse.data.lat}&lon=${geoLocResponse.data.lon}&appid=${this.appId}`
            );
            this.handleStatus("success");
            console.log("weatherResponse: ", weatherResponse);
            this.handleWeatherData(weatherResponse.data);
          } else if (position) {
            weatherResponse = await this.$http.get(
              `${this.baseUrl}lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${this.appId}`
            );
            console.log("weatherResponse: ", weatherResponse);
            this.handleWeatherData(weatherResponse.data);
            this.handleStatus("success");
          }
        } catch (error) {
          console.log("Request failed.  Returned status of", error);
          this.handleStatus("error");
        }
      },
    },
  };
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
