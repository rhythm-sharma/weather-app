<template>
  <div class="bar mb-5">
    <form @submit.prevent="handleSubmit()">
      <input v-model="searchStr" class="searchbar" title="Search" />
      <i v-if="UserIstyping" class="fas fa-times"></i>
      <i v-else type="submit" class="fas fa-search"></i>
    </form>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";

  export default {
    name: "SearchBar",

    data() {
      return {
        UserIstyping: false,
        searchStr: "",
        baseLatLonAPI: "https://api.openweathermap.org/data/2.5/weather?",
        baseWeatherAPI: "https://api.openweathermap.org/data/2.5/onecall?",
      };
    },

    computed: {
      ...mapGetters(["appId", "geoLocationCityName"]),
    },

    methods: {
      ...mapActions(["handleStatus", "handleWeatherData"]),
      handleSubmit() {
        console.log("submit", this.searchStr);
        this.getWeatherResponse(this.searchStr);
      },
      // get the weather response
      async getWeatherResponse(searchStr) {
        this.handleStatus("loading");
        let LatLonResponse;
        let weatherResponse;

        // get Lat and Lon
        try {
          LatLonResponse = await this.$http.get(
            `${this.baseLatLonAPI}q=${searchStr}&appid=${this.appId}`
          );
          console.log("LatLonResponse", LatLonResponse);
        } catch (error) {
          console.log("Request failed.  Returned status of", error);
          this.handleStatus("error");
        }

        try {
          if (LatLonResponse) {
            weatherResponse = await this.$http.get(
              `${this.baseWeatherAPI}lat=${LatLonResponse.data.coord.lat}&lon=${LatLonResponse.data.coord.lon}&appid=${this.appId}`
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

    watch: {
      "$store.state.geoLocationCityName"(value, oldValue) {
        console.log(value, oldValue);
        if (value !== oldValue) {
          this.searchStr = value;
        }
      },
    },
  };
</script>

<style>
  .bar {
    margin: 0 auto;
    width: auto;
    max-width: 700px;
    border-radius: 0.75rem !important;
    border: 1px solid #dcdcdc;
    box-shadow: 1px 1px 8px 1px #dcdcdc;
  }
  .bar:focus-within {
    box-shadow: 1px 1px 8px 1px #dcdcdc;
    outline: none;
  }
  .searchbar {
    height: 45px;
    border: none;
    width: 650px;
    max-width: 650px;
    font-size: 16px;
    outline: none;
  }
  .voice {
    height: 20px;
    position: relative;
    top: 5px;
    left: 10px;
  }

  @media screen and (max-width: 800px) {
    .bar {
      width: 95vw;
    }
    .searchbar {
      width: 85vw;
    }
  }
</style>
