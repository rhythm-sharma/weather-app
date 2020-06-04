<template>
  <div id="app">
    <ComponentContainer :status="status" :weatherData="weatherData" />
  </div>
</template>

<script>
  import ComponentContainer from "./components/ComponentContainer.vue";

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
        appId: "3e235f332dbb113f10b747e66f2a40da",
        weatherData: {},
        status: "",
      };
    },

    mounted() {
      this.getGeoLocation();
    },

    methods: {
      getGeoLocation() {
        this.status = "loading";
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
              that.ipLookUp();
            }
          );
        } else {
          // geolocation is not supported
          // get your location some other way
          console.log("geolocation is not enabled on this browser");
          this.ipLookUp();
        }
      },
      async ipLookUp(position) {
        let geoLocResponse;
        let weatherResponse;

        // get Geo-Location using IP
        try {
          geoLocResponse = await this.$http.get("http://ip-api.com/json");
          console.log("geoLocResponse", geoLocResponse);
        } catch (error) {
          console.log("Request failed.  Returned status of", error);
        }

        // get the weather response
        try {
          if (geoLocResponse) {
            weatherResponse = await this.$http.get(
              `${this.baseUrl}lat=${geoLocResponse.data.lat}&lon=${geoLocResponse.data.lon}&appid=${this.appId}`
            );
            this.status = "success";
            console.log("weatherResponse: ", weatherResponse);
            this.weatherData = weatherResponse.data;
          } else if (position) {
            weatherResponse = await this.$http.get(
              `${this.baseUrl}lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${this.appId}`
            );
            console.log("weatherResponse: ", weatherResponse);
            this.weatherData = weatherResponse.data;
            this.status = "success";
          }
        } catch (error) {
          console.log("Request failed.  Returned status of", error);
          this.status = "error";
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
