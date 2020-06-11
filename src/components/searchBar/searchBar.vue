<template>
  <div class="bar-container mb-5">
    <div class="bar">
      <form @submit.prevent="handleSubmit()">
        <img class="mb-1 location-icon" :src="locationIcon" />
        <input
          @keyup="resetSuggestedStatusValues"
          v-model="searchStr"
          class="searchbar pl-2 font-weight-bold"
          title="Search"
          placeholder="Search weather"
        />
        <i v-if="UserIstyping" class="fas fa-times"></i>
        <i v-else type="submit" @click="handleSubmit" class="fas fa-search"></i>
      </form>
    </div>
    <div class="d-flex justify-content-center">
      <div
        v-click-outside="clearSuggestions"
        v-if="
          searchStr.length >= 3 &&
          firstLoad === false &&
          dropDownCitySelected === false
        "
        class="position-absolute drop-down-container round-corner"
      >
        <div v-for="(cityData, index) in suggestedCity" :key="index">
          <drop-down
            @clearSuggestions="clearSuggestions"
            @selectCityName="(str) => selectCityName(str)"
            :cityData="cityData"
            :searchStr="searchStr"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  import DropDown from "./dropDown/dropDown";

  export default {
    name: "SearchBar",

    components: {
      DropDown,
    },

    data() {
      return {
        UserIstyping: false,
        searchStr: "",
        baseLatLonAPI: "https://api.openweathermap.org/data/2.5/weather?",
        baseWeatherAPI: "https://api.openweathermap.org/data/2.5/onecall?",
        cityData: [],
        suggestedCity: [],
        locationIcon: require("../../assets/location.svg"),
        firstLoad: true,
        dropDownCitySelected: false,
      };
    },

    mounted() {
      this.firstLoad = true;
      this.searchStr = this.geoLocationCityName;
      this.getCityDataFromLocalStorage();
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
      getCityDataFromLocalStorage() {
        this.cityData = JSON.parse(localStorage.getItem("cityData"));
      },
      clearSuggestions() {
        this.suggestedCity = [];
      },
      selectCityName(searchStr) {
        this.dropDownCitySelected = true;
        if (searchStr) {
          this.searchStr = searchStr;
        }
        this.clearSuggestions();
      },
      resetSuggestedStatusValues() {
        this.dropDownCitySelected = false;
        this.firstLoad = false;
      },
    },

    watch: {
      searchStr(value) {
        if (value.length >= 3) {
          let results = this.cityData.filter((cityObj) => {
            return (
              cityObj.city.findname
                .toLowerCase()
                .indexOf(value.toLowerCase()) >= 0
            );
          });
          this.suggestedCity = results.slice(0, 3);
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
    border-color: #1973e8;
  }

  .searchbar {
    height: 45px;
    border: none;
    width: 620px;
    max-width: 620px;
    font-size: 16px;
    outline: none;
  }

  .drop-down-container {
    overflow: hidden;
    perspective: 1px;
    margin: 0 auto;
    width: auto;
    max-width: 700px;
    box-shadow: 1px 1px 8px 1px #dcdcdc;
  }

  .round-corner {
    border-radius: 0.75rem !important;
  }

  .location-icon {
    width: 20px;
  }

  .fa-search {
    -webkit-appearance: none;
  }

  @media screen and (max-width: 800px) {
    .bar,
    .drop-down-container {
      width: 95vw;
    }
    .searchbar {
      width: 85vw;
    }
  }

  @media screen and (max-width: 700px) {
    .bar-container {
      margin-bottom: 1rem !important;
    }
  }

  @media screen and (max-width: 425px) {
    .searchbar {
      width: 75vw;
    }
  }
</style>
